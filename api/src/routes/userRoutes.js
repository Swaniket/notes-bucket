import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
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
// @ROUTE-   POST: /api/users/me
// @ACCESS-  Protected
router.get("/me", authenicated, getUserProfile);

export { router as userRouter };
