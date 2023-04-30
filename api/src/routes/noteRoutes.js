import express from "express";
import { authenicated } from "../middleware/authMiddleware.js";
import {
  getNotes,
  getNoteById,
  getNoteByTag,
  createNote,
  editNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// @DESC-    Get Notes for a user
// @ROUTE-   GET: /api/notes/all
// @ACCESS-  Protected
router.get("/all", authenicated, getNotes);

// @DESC-    Get a note by ID (May not be needed)
// @ROUTE-   GET: /api/notes/note/:id
// @ACCESS-  Protected
router.get("/note/:id", authenicated, getNoteById);

// @DESC-    Get notes by Tag
// @ROUTE-   GET: /api/notes/note-tag/:id
// @ACCESS-  Protected
router.get("/note-tag/:id", authenicated, getNoteByTag);

// @DESC-    Create a new note
// @ROUTE-   POST: /api/notes/create
// @ACCESS-  Protected
router.post("/create", authenicated, createNote);

// @DESC-    Edit a note
// @ROUTE-   POST: /api/notes/edit
// @ACCESS-  Protected
router.post("/edit", authenicated, editNote);

// @DESC-    Delete a note
// @ROUTE-   DELETE: /api/notes/delete
// @ACCESS-  Protected
router.post("/delete", authenicated, deleteNote);

export { router as noteRouter };
