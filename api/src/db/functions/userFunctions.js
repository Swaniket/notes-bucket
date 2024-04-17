import { executeQuery } from "../../helpers/dbHelper.js";

// Find user by Email from DB
export const findUserFromDB = async (email) => {
  const queryString = `SELECT * FROM users WHERE email='${email}'`;
  const result = await executeQuery(queryString);
  return result[0];
};

// Find user by User ID from DB
export const findUserByIDFromDB = async (userId) => {
  const queryString = `SELECT * FROM users WHERE userId='${userId}'`;
  const result = await executeQuery(queryString);
  return result[0];
};

// Creates a new user Record
export const createUserInDB = async ({
  userId,
  email,
  password,
  firstName,
  lastName,
}) => {
  const queryString = `INSERT INTO users (userId, email, password, firstName, lastName) VALUES ('${userId}', '${email}', '${password}', '${firstName}', '${lastName}')`;
  await executeQuery(queryString);
  const createdUser = findUserFromDB(email);
  return createdUser;
};

// Returns Stats from DB
export const getNotesStatsDB = async (userId) => {
  const result = [];

  const queryStringTotalNotes = `SELECT count(*) as totalNotes FROM Notes WHERE createdBy = '${userId}'`;
  const totalNotes = await executeQuery(queryStringTotalNotes);
  result.push(totalNotes[0]);

  const queryStringPinnedNotes = `SELECT count(*) as pinnedNotes FROM Notes WHERE createdBy = '${userId}' AND isPinned = 'true'`;
  const pinnedNotes = await executeQuery(queryStringPinnedNotes);
  result.push(pinnedNotes[0]);

  const queryStringArchivedNotes = `SELECT count(*) as archivedNotes FROM Notes WHERE createdBy = '${userId}' AND isArchived = 'true'`;
  const archivedNotes = await executeQuery(queryStringArchivedNotes);
  result.push(archivedNotes[0]);

  return result;
};

// Edit a User Profile in DB
export const editProfileInDB = async ({ userId, firstName, lastName }) => {
  const queryString = `UPDATE users SET firstName='${firstName}', lastName='${lastName}' WHERE userId='${userId}'`;
  const result = await executeQuery(queryString);
  return result;
};

// Edit user password in DB
export const editProfilePasswordInDB = async ({ userEmail, newPassword }) => {
  const queryString = `UPDATE users SET password='${newPassword}', passwordResetToken=null WHERE email='${userEmail}'`;
  const result = await executeQuery(queryString);
  return result;
};

// Insert token in DB
export const insertTokenInDB = async ({ email, token }) => {
  const queryString = `UPDATE users SET passwordResetToken='${token}' WHERE email='${email}'`;
  const result = await executeQuery(queryString);
  return result;
};
