import { executeQuery } from "../../helpers/dbHelper.js";

// Creates a note in the DB
export const createNoteInDB = async ({
  noteId,
  createdBy,
  createdAt,
  updatedAt,
  heading,
  body,
  isPinned,
  isArchived,
  tagId,
}) => {
  const queryString = `INSERT INTO Notes (noteId, createdBy, createdAt, updatedAt, heading, body, isPinned, isArchived, tagId) VALUES ("${noteId}", "${createdBy}", "${createdAt}", "${updatedAt}", "${heading}", "${body}", "${isPinned}", "${isArchived}", "${tagId}")`;
  console.log(queryString);
  const result = await executeQuery(queryString);
  return result;
};

// Get notes from DB for a perticular user
export const getNotesByUserFromDB = async (useId) => {
  const queryString = `
  SELECT nt.noteID, nt.createdAt, nt.updatedAt, nt.heading, nt.body, nt.isPinned, nt.isArchived, nt.tagID, nt.tagName, u.userId
  FROM users u LEFT JOIN
  (SELECT n.noteId, n.createdBy UserID_Notes, n.createdAt, n.updatedAt, n.heading, n.body, n.isPinned, n.isArchived, n.tagId, t.tagName, t.userId FROM Notes n
  LEFT JOIN tags t
    ON n.tagId = t.tagId) nt
  ON u.userId=nt.UserID_Notes
  WHERE u.userId= "${useId}";
  `;
  const result = await executeQuery(queryString);
  return result;
};

// Get notes from DB for a perticular user by noteId
export const getNoteByIdFromDB = async (noteId, userId) => {
  const queryString = `SELECT * FROM Notes WHERE createdBy='${userId}' AND noteId = '${noteId}'`;
  const result = await executeQuery(queryString);
  return result[0];
};

// Edit a note in DB
export const editNoteInDB = async ({
  noteId,
  updatedAt,
  heading,
  body,
  isPinned,
  isArchived,
  tagId,
}) => {
  const queryString = `UPDATE Notes SET updatedAt="${updatedAt}", heading="${heading}", body="${body}", isPinned="${isPinned}", isArchived="${isArchived}", tagId="${tagId}" WHERE noteId='${noteId}'`;
  const result = await executeQuery(queryString);
  return result;
};

// Delete Note from DB by noteId
export const deleteNoteFromDB = async (noteId) => {
  const queryString = `DELETE FROM Notes WHERE noteId='${noteId}'`;
  const result = await executeQuery(queryString);
  return result;
};

export const getNotesByTagIdFromDB = async (userId, tagId) => {
  const queryString = `SELECT * FROM Notes WHERE createdBy='${userId}' AND tagId = '${tagId}'`;
  const result = await executeQuery(queryString);
  return result;
};
