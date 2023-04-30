import asyncHandler from "express-async-handler";
import { verifyJWTToken } from "../helpers/jwtHelper.js";
import { findUserByIDFromDB } from "../db/functions/userFunctions.js";

export const authenicated = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token from header
      // Requied token format authorization: Bearer <TOKEN>
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = verifyJWTToken(token);

      if (!decodedToken.id) {
        res.status(401);
        throw new Error("Not Authorized");
      }

      // Get the user by ID present in the token and setting it to req.user
      req.user = await findUserByIDFromDB(decodedToken.id);

      if (!req.user) {
        res.status(401);
        throw new Error("Not Authorized");
      }

      next();
    } catch (e) {
      console.error("AUTH MIDDLEWARE ERROR:", e);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
});
