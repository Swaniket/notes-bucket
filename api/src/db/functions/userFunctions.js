import connection from "../config.js";

const executeQuery = async (queryString) => {
  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const findUserFromDB = async (email) => {
  const queryString = `SELECT * FROM users WHERE email='${email}'`;
  const result = await executeQuery(queryString);
  console.log(result);
  return result[0];
};
