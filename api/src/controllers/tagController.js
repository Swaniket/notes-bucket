import asyncHandler from "express-async-handler";
import {
  getTagsByUserFromDB,
  createNewTagInDB,
  editTagInDB,
  deleteTagInDB,
} from "../db/functions/tagFunctions.js";
import {
  getNotesByTagIdFromDB,
  deleteNoteFromDB,
} from "../db/functions/noteFunctions.js";
import { generateRequestBody } from "../helpers/utils.js";
import { v4 as uuidv4 } from "uuid";

/*
    @DESC   - Get all tags for a perticular User
    @ROUTE  - GET: /api/tags/all
    @ACCESS - Protected 
*/
const getTags = asyncHandler(async (req, res) => {
  const userIdFromToken = req.user.userId;

  try {
    const tags = await getTagsByUserFromDB(userIdFromToken);

    if (tags && tags !== []) {
      res
        .status(200)
        .json(generateRequestBody("success", 200, "Success", tags));
    } else {
      res
        .status(404)
        .json(generateRequestBody("error", 404, "No Tags found", []));
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

/*
    @DESC   - Add a new Tag
    @ROUTE  - POST: /api/tags/new
    @ACCESS - Protected 
*/
const createNewTag = asyncHandler(async (req, res) => {
  const userIdFromToken = req.user.userId;
  const { tagName } = req.body;

  if (!tagName) {
    res.status(400);
    throw new Error("Invalid Form Submission");
  }

  try {
    const tagObj = {
      tagId: uuidv4(),
      tagName: tagName,
      userId: userIdFromToken,
    };

    const result = await createNewTagInDB({ ...tagObj });

    if (result?.affectedRows === 1) {
      res
        .status(201)
        .json(
          generateRequestBody("success", 201, "Tag Added Successfully", {})
        );
    } else {
      res.status(500);
      throw new Error("Tag can't be created");
    }

    res.status(200).status(result);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

/*
    @DESC   - Edit an existing Tag
    @ROUTE  - POST: /api/tags/edit
    @ACCESS - Protected 
*/
const editTag = asyncHandler(async (req, res) => {
  const userIdFromToken = req.user.userId;
  const { tagId, tagName } = req.body;

  if (!tagId || !tagName) {
    res.status(400);
    throw new Error("Invalid Form Submission");
  }

  try {
    // Get the list of tags for the given user
    const tags = await getTagsByUserFromDB(userIdFromToken);

    if (tags?.length > 0) {
      let tagExists = false;

      tags?.forEach((tag) => {
        if (tag?.tagId === tagId) tagExists = true;
      });

      if (!tagExists) {
        res
          .status(404)
          .json(
            generateRequestBody("error", 404, "No Tag found with the ID", [])
          );
        return;
      }

      // Edit the tag in the DB if it exists
      const result = await editTagInDB({ tagId, tagName });

      if (result?.affectedRows === 1) {
        res
          .status(201)
          .json(
            generateRequestBody("success", 201, "Tag Edited Successfully", {})
          );
      } else {
        res.status(500);
        throw new Error("Tag can't be edited");
      }
    } else {
      res
        .status(404)
        .json(
          generateRequestBody("error", 404, "No Tag found with the ID", [])
        );
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

/*
    @DESC   - Delete a Tag
    @ROUTE  - POST: /api/tags/delete
    @ACCESS - Protected 
*/
const deleteTag = asyncHandler(async (req, res) => {
  const userIdFromToken = req.user.userId;
  const { tagId } = req.body;

  if (!tagId) {
    res.status(400);
    throw new Error("Invalid Form Submission");
  }

  try {
    // Get the list of tags for the given user
    const tags = await getTagsByUserFromDB(userIdFromToken);

    if (tags?.length > 0) {
      let tagExists = false;

      tags?.forEach((tag) => {
        if (tag?.tagId === tagId) tagExists = true;
      });

      if (!tagExists) {
        res
          .status(404)
          .json(
            generateRequestBody("error", 404, "No Tag found with the ID", [])
          );
        return;
      }

      // Delete the tag in the DB and all the notes under that tag if any exists
      // Step 1 - Get all the notes with that perticular tagId & userId
      const notes = await getNotesByTagIdFromDB(userIdFromToken, tagId);

      if (notes && notes?.length > 0) {
        // Step 2 - Delete the notes for the tagId
        notes.forEach(async (note) => {
          await deleteNoteFromDB(note?.noteId);
        });
      }

      // Step 3 - Delete the tag
      const result = await deleteTagInDB(tagId);

      if (result?.affectedRows === 1) {
        res
          .status(202)
          .json(
            generateRequestBody("accepted", 202, "Tag Deleted Successfully", {})
          );
      } else {
        res.status(500);
        throw new Error("Tag can't be deleted");
      }
    } else {
      res
        .status(404)
        .json(
          generateRequestBody("error", 404, "No Tag found with the ID", [])
        );
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

export { getTags, createNewTag, editTag, deleteTag };
