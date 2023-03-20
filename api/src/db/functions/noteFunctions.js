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
  const queryString = `INSERT INTO Notes (noteId, createdBy, createdAt, updatedAt, heading, body, isPinned, isArchived, tagId) VALUES ('${noteId}', '${createdBy}', '${createdAt}', '${updatedAt}', '${heading}', '${body}', '${isPinned}', '${isArchived}', '${tagId}')`;
  const result = await executeQuery(queryString);
  console.log("result", result);
  return result;
};
