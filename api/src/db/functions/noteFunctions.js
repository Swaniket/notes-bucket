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
  console.log("queryString", queryString);
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
