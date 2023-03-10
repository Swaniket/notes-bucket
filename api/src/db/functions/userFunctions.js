import connection from "../config.js";

const executeQuery = async (queryString) => {
  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Find user by Email from DB
export const findUserFromDB = async (email) => {
  const queryString = `SELECT * FROM users WHERE email='${email}'`;
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
  console.log("queryString", queryString);
  await executeQuery(queryString);
  const createdUser = findUserFromDB(email);
  return createdUser;
};
