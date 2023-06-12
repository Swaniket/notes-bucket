import { executeQuery } from "../../helpers/dbHelper.js";

// Get all the Tags from DB for a perticular UserId
export const getTagsByUserFromDB = async (userId) => {
  const queryString = `SELECT tagId, tagName FROM Tags WHERE userId = '${userId}'`;
  const result = await executeQuery(queryString);
  return result;
};

// Create a new Tag in DB
export const createNewTagInDB = async ({ userId, tagId, tagName }) => {
  const queryString = `INSERT INTO Tags (tagId, tagName, userId) VALUES ('${tagId}', '${tagName}', '${userId}')`;
  const result = await executeQuery(queryString);
  return result;
};

// Get tag by ID from DB
export const getTagByIdFromDB = async (tagId) => {
  const queryString = `SELECT tagId FROM Tags WHERE tagId = '${tagId}'`;
  const result = await executeQuery(queryString);
  return result;
};

// Edit Tag in DB
export const editTagInDB = async ({ tagId, tagName }) => {
  const queryString = `UPDATE Tags SET tagName="${tagName}" WHERE tagId="${tagId}"`;
  const result = await executeQuery(queryString);
  return result;
};

// Delete Tag from DB
export const deleteTagInDB = async (tagId) => {
  const queryString = `DELETE FROM Tags WHERE tagId="${tagId}"`;
  const result = await executeQuery(queryString);
  return result;
};
