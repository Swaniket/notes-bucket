import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { createNoteInDB } from "../db/functions/noteFunctions.js";
import { convertDateTime, generateRequestBody } from "../helpers/utils.js";

const getNotes = asyncHandler(async (req, res) => {});
const getNoteById = asyncHandler(async (req, res) => {});
const getNoteByTag = asyncHandler(async (req, res) => {});

/*
@DESC   - Create a new note
@ROUTE  - POST: /api/notes/create
@ACCESS - Protected
@FIELDS - 
        createdAt: Optional | If not provided, server will create it | Default: Current date
        heading: Required
        body: Required
        isPinned: Optional | If not provided, server will create it | Default: false
        isArchived: Optional | If not provided, server will create it | Default: false
        tagId: Required
*/
const createNote = asyncHandler(async (req, res) => {
  const { createdAt, heading, body, isPinned, isArchived, tagId } = req.body;

  // Validation
  if (!heading || !body || !tagId) {
    res.status(400);
    throw new Error("Invalid Form Submission");
  }

  // Create the note in DB
  try {
    const noteObject = {
      noteId: uuidv4(),
      createdBy: req.user.userId,
      createdAt: createdAt ? createdAt : convertDateTime(new Date()),
      updatedAt: convertDateTime(new Date()),
      heading: heading,
      body: body,
      isPinned: isPinned ? isPinned : false,
      isArchived: isArchived ? isArchived : false,
      tagId: tagId,
    };

    console.log("noteObject", noteObject);

    const result = await createNoteInDB({ ...noteObject });

    if (result.affectedRows === 1) {
      res
        .status(201)
        .json(
          generateRequestBody("success", 201, "Note added successfully", {})
        );
    } else {
      res.status(500);
      throw new Error("Note can't be created");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});
const editNote = asyncHandler(async (req, res) => {});
const deleteNote = asyncHandler(async (req, res) => {});

export {
  getNotes,
  getNoteById,
  getNoteByTag,
  createNote,
  editNote,
  deleteNote,
};
