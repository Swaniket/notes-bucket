import express from "express";
import { authenicated } from "../middleware/authMiddleware";

const router = express.Router();

// @DESC-    Get available tags for a user
// @ROUTE-   GET: /api/notes/all
// @ACCESS-  Protected
// router.get("/all", authenicated, getTags);

export { router as tagRouter };
