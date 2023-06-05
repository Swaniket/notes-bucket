import express from "express";
import {
  getTags,
  createNewTag,
  editTag,
  deleteTag,
} from "../controllers/tagController.js";
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

// @DESC-    Edit an existing Tag
// @ROUTE-   POST: /api/tags/edit
// @ACCESS-  Protected
router.post("/edit", authenicated, editTag);

// @DESC-    Delete a Tag
// @ROUTE-   POST: /api/tags/delete
// @ACCESS-  Protected
router.post("/delete", authenicated, deleteTag);

export { router as tagRouter };
