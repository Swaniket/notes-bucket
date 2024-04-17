import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  editUserProfile,
  sendResetPasswordEmail,
  resetPassword,
} from "../controllers/userController.js";
import { authenicated } from "../middleware/authMiddleware.js";

const router = express.Router();

// @DESC-    User Login
// @ROUTE-   POST: /api/users/login
// @ACCESS-  Public
router.post("/login", loginUser);

// @DESC-    User Registration
// @ROUTE-   POST: /api/users/register
// @ACCESS-  Public
router.post("/register", registerUser);

// @DESC-    Get User Profile
// @ROUTE-   GET: /api/users/me
// @ACCESS-  Protected
router.get("/me", authenicated, getUserProfile);

// @DESC-    Modify User Profile
// @ROUTE-   POST: /api/users/me/edit
// @ACCESS-  Protected
router.post("/me/edit", authenicated, editUserProfile);

// @DESC-    Send the reset password link in the email
// @ROUTE-   POST: /api/users/reset-password-email
// @ACCESS-  Public
router.post("/reset-password-email", sendResetPasswordEmail);

// @DESC-    Resets password in the DB
// @ROUTE-   POST: /api/users/reset-password/:token
// @ACCESS-  Public
router.post("/reset-password", resetPassword);

export { router as userRouter };
