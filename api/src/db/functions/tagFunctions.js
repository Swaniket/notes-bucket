import { executeQuery } from "../../helpers/dbHelper.js";

export const getTagsByUserFromDB = async (userId) => {
  const queryString = `SELECT tagId, tagName FROM Tags WHERE userId = '${userId}'`;
  const result = await executeQuery(queryString);

  return result;
};

export const createNewTagInDB = async ({ userId, tagId, tagName }) => {
  const queryString = `INSERT INTO Tags (tagId, tagName, userId) VALUES ('${tagId}', '${tagName}', '${userId}')`;
  const result = await executeQuery(queryString);

  return result;
};
