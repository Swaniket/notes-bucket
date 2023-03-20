import connection from "../db/config.js";

export const executeQuery = async (queryString) => {
  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
