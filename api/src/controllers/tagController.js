import asyncHandler from "express-async-handler";
import {
  getTagsByUserFromDB,
  createNewTagInDB,
} from "../db/functions/tagFunctions.js";
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

export { getTags, createNewTag };
