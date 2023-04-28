import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import {
  createNoteInDB,
  getNotesByUserFromDB,
  deleteNoteFromDB,
} from "../db/functions/noteFunctions.js";
import { convertDateTime, generateRequestBody } from "../helpers/utils.js";
import { getTagByIdFromDB } from "../db/functions/tagFunctions.js";

/*
  @DESC   - Get Notes for a user
  @ROUTE  - GET: /api/notes/all
  @ACCESS - Protected
*/
const getNotes = asyncHandler(async (req, res) => {
  const userIdFromToken = req.user.userId;

  try {
    const notes = await getNotesByUserFromDB(userIdFromToken);

    if (notes.length > 0 && notes[0].noteId !== null) {
      res
        .status(200)
        .json(generateRequestBody("success", 200, "Success", notes));
    } else {
      res
        .status(200)
        .json(generateRequestBody("success", 200, "No Notes found", {}));
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

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
    const tagIdFromDB = await getTagByIdFromDB(tagId);

    // @TODO: Take a look at the date issue

    // If Tag Exists
    if (tagIdFromDB?.length > 0) {
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

      const result = await createNoteInDB({ ...noteObject });

      if (result?.affectedRows === 1) {
        res
          .status(201)
          .json(
            generateRequestBody("success", 201, "Note added successfully", {})
          );
      } else {
        res.status(500);
        throw new Error("Note can't be created");
      }
    } else {
      res.status(400);
      throw new Error("Invalid Tag Selected");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

const editNote = asyncHandler(async (req, res) => {});

/*
  @DESC   - Delete a note by noteId
  @ROUTE  - DELETE: /api/notes/delete
  @ACCESS - Protected
*/
const deleteNote = asyncHandler(async (req, res) => {
  const { noteId } = req.body;
  const userIdFromToken = req.user.userId;

  // Validation
  if (!noteId) {
    res.status(400);
    throw new Error("Invalid Form Submission");
  }

  // Check if the note exists for this perticular User or not
  try {
    const notesForLoggedInUser = await getNotesByUserFromDB(userIdFromToken);

    if (
      notesForLoggedInUser.length > 0 &&
      notesForLoggedInUser[0].noteId !== null
    ) {
      let noteIdToDelete = "";

      notesForLoggedInUser.forEach((note) => {
        if (note?.noteId === noteId) {
          noteIdToDelete = note?.noteId;
        }
      });

      if (noteIdToDelete === "") {
        // Say that no note matched with the given ID
        res
          .status(404)
          .json(
            generateRequestBody(
              "not found",
              404,
              "No Note found with the note Id",
              {}
            )
          );
      } else {
        console.log("noteIdToDelete", noteIdToDelete);
        const result = await deleteNoteFromDB(noteIdToDelete);

        if (result?.affectedRows === 1) {
          res
            .status(202)
            .json(
              generateRequestBody(
                "success",
                202,
                "Note Delete Successfully",
                {}
              )
            );
        }
      }
    } else {
      // Send that user don't have any notes
      res
        .status(404)
        .json(
          generateRequestBody(
            "not found",
            404,
            "No Note found with the note Id",
            {}
          )
        );
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

export {
  getNotes,
  getNoteById,
  getNoteByTag,
  createNote,
  editNote,
  deleteNote,
};
