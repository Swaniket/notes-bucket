import bcrypt from "bcryptjs";

const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

const getHashedPassword = (password) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hash(String(password), parseInt(saltRounds)));
  });
};

const comparePasswords = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export { getHashedPassword, comparePasswords };
