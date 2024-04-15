import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import {
  comparePasswords,
  getHashedPassword,
} from "../helpers/bcryptHelper.js";
import { generateJWTToken, verifyJWTToken } from "../helpers/jwtHelper.js";
import {
  findUserFromDB,
  findUserByIDFromDB,
  createUserInDB,
  getNotesStatsDB,
  editProfileInDB,
  insertTokenInDB,
  editProfilePasswordInDB,
} from "../db/functions/userFunctions.js";
import {
  generateRequestBody,
  generateResetPasswordLink,
} from "../helpers/utils.js";
import { generateMailOptions, sendEmail } from "../helpers/emailHelper.js";

// @DESC-    User Login
// @ROUTE-   POST: /api/users/login
// @ACCESS-  Public
// @TODO-    Validation for Form Data
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid Form Submission");
  }

  // Check if the user exists in the database
  try {
    const user = await findUserFromDB(email);

    if (user && (await comparePasswords(password, user.password))) {
      res.status(200).json(
        generateRequestBody("success", 200, "Login Successful", {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateJWTToken({ id: user.userId }),
        })
      );
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

// @DESC-    User Registration
// @ROUTE-   POST: /api/users/register
// @ACCESS-  Public
// @TODO-    Validation for Form Data
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validation
  if (!email || !password || !firstName || !lastName) {
    res.status(400);
    throw new Error("Invalid Form Submission");
  }

  // Find the user already exists
  try {
    const userExists = await findUserFromDB(email);
    if (userExists) {
      res.status(400);
      throw new Error("User already exists!");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }

  const hashedPassword = await getHashedPassword(password);

  // Create User
  try {
    const userObj = {
      userId: uuidv4(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };

    const user = await createUserInDB({ ...userObj });

    if (user) {
      res.status(200).json(
        generateRequestBody("success", 200, "Account Creation Successful", {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateJWTToken({ id: user.userId }),
        })
      );
    } else {
      res.status(400);
      throw new Error("Account could not be created");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

// @DESC-    Get User Profile
// @ROUTE-   GET: /api/users/me
// @ACCESS-  Protected
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    // Get the notes stats
    const userIdFromToken = req.user.userId;

    try {
      const [totalNotes, pinnedNotes, archivedNotes] = await getNotesStatsDB(
        userIdFromToken
      );

      res.status(200).json(
        generateRequestBody("success", 200, "Request Successful", {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          stats: {
            totalNotes: totalNotes.totalNotes,
            pinnedNotes: pinnedNotes.pinnedNotes,
            archivedNotes: archivedNotes.archivedNotes,
          },
        })
      );
    } catch (err) {
      res.status(500);
      throw new Error(err);
    }
  }
});

// @DESC-    Modify User Profile
// @ROUTE-   POST: /api/users/me/edit
// @ACCESS-  Protected
const editUserProfile = asyncHandler(async (req, res) => {
  const userIdFromToken = req.user.userId;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Invalid Form Submission");
  }

  try {
    // Validate if a profile exists with the ID
    const user = await findUserByIDFromDB(userIdFromToken);

    if (!user) {
      res
        .status(404)
        .json(generateRequestBody("error", 404, "User does not exists", {}));
      return;
    }

    const result = await editProfileInDB({
      userId: userIdFromToken,
      firstName,
      lastName,
    });

    if (result?.affectedRows === 1) {
      res
        .status(201)
        .json(
          generateRequestBody("success", 201, "Profile Edited Successfully", {})
        );
    } else {
      res.status(500);
      throw new Error("Profile can't be edited");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

// @DESC-    Send the reset password link in the email
// @ROUTE-   POST: /api/users/reset-password-email
// @ACCESS-  Protected
const sendResetPasswordEmail = asyncHandler(async (req, res) => {
  const { email, userId, firstName } = req.user;
  try {
    const resetPasswordToken = generateJWTToken({ email }, "10m");
    const result = await insertTokenInDB({ userId, token: resetPasswordToken });

    if (result?.affectedRows !== 1) {
      res.status(500);
      throw new Error("Something went wrong");
    }

    // Generate the link
    const resetPasswordLink = generateResetPasswordLink(resetPasswordToken);

    // Generate Email Options
    const mailOptions = generateMailOptions(
      email,
      "Test Subject",
      `Hi ${firstName}, \nYou have requested a password reset, please follow this link to reset password ${resetPasswordLink} \nThis link will expire within 10mins.`
    );

    // Send the email
    await sendEmail(mailOptions, (error, info) => {
      if (error) {
        res
          .status(500)
          .json(generateRequestBody("error", 500, "Cant send email", error));
      } else {
        res.status(200).json(generateRequestBody("success", 200, "Email Send"));
      }
    });
  } catch (e) {
    res.status(500);
    throw new Error(e);
  }
});

// @DESC-    Resets password in the DB
// @ROUTE-   POST: /api/users/reset-password/:token
// @ACCESS-  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  try {
    // Validation
    if (!token || !password) {
      res.status(400);
      throw new Error(
        "Invalid Form Submission, expected a token in query string parameters, and new password in request body."
      );
    }

    // Verify the token and get the email
    const decodedToken = verifyJWTToken(token);

    if (!decodedToken.email) {
      res.status(401);
      throw new Error(decodedToken.message);
    }

    const hashedPassword = await getHashedPassword(password);

    const result = await editProfilePasswordInDB({
      userEmail: decodedToken.email,
      newPassword: hashedPassword,
    });

    if (result?.affectedRows === 1) {
      res
        .status(201)
        .json(
          generateRequestBody(
            "success",
            201,
            "Password Updated Successfully",
            {}
          )
        );
    } else {
      res.status(500);
      throw new Error("Password can't be edited");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export {
  loginUser,
  registerUser,
  getUserProfile,
  editUserProfile,
  sendResetPasswordEmail,
  resetPassword,
};
