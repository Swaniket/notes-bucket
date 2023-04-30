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
