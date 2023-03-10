import asyncHandler from "express-async-handler";
import { comparePasswords } from "../helpers/bcryptHelper.js";
import { generateJWTToken } from "../helpers/jwtHelper.js";
import { findUserFromDB } from "../db/functions/userFunctions.js";
import { generateRequestBody } from "../helpers/utils.js";

// @DESC-    User Login
// @ROUTE-   POST: /api/users/login
// @ACCESS-  Public
// @TODO- Determine a structure for the response
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

    console.log("user", user);

    // user && (await comparePasswords(password, user.password))
    if (user && password === user.password) {
      res.status(200).json(
        generateRequestBody("success", 200, "Login Successful", {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateJWTToken(user.id),
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

const registerUser = asyncHandler(async (req, res) => {});

const getUserProfile = asyncHandler(async (req, res) => {});

export { loginUser, registerUser, getUserProfile };
