import jwt from "jsonwebtoken";

console.log(process.env.JWT_SECRET);

export const generateJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
