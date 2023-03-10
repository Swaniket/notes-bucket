import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";

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
// @ROUTE-   POST: /api/users/me
// @ACCESS-  Protected
router.post("/me", getUserProfile);

export { router as userRouter };
