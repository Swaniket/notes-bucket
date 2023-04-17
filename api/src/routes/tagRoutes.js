import express from "express";
import { getTags, createNewTag } from "../controllers/tagController.js";
import { authenicated } from "../middleware/authMiddleware.js";

const router = express.Router();

// @DESC-    Get available tags for a user
// @ROUTE-   GET: /api/tags/all
// @ACCESS-  Protected
router.get("/all", authenicated, getTags);

// @DESC-    Get available tags for a user
// @ROUTE-   POST: /api/tags/new
// @ACCESS-  Protected
router.post("/new", authenicated, createNewTag);

export { router as tagRouter };
