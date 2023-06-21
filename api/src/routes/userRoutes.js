import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  editUserProfile,
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
router.get("/me/edit", authenicated, editUserProfile);

export { router as userRouter };
