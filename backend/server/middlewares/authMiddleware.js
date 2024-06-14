import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { createTokens } from "../tokens/createTokens.js";

export const isAuth =
  (shouldThrow = true) =>
  async (req, res, next) => {
    const accessToken = req.headers["access-token"];
    if (typeof accessToken !== "string") {
      return next(shouldThrow && createHttpError(401, "Not authenticated"));
    }

    try {
      const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.userId = data.userId;
      return next();
    } catch (err) {
      console.log(err);
    }

    const refreshToken = req.headers["refresh-token"];
    if (typeof refreshToken !== "string") {
      return next(shouldThrow && createHttpError(401, "not authenticated"));
    }

    let data;

    try {
      data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      return next(shouldThrow && createHttpError(401, "not authenticated"));
    }

    const user = await User.findById(data.userId);

    if (!user || tokenVersion !== data.tokenVersion) {
      return next(shouldThrow && createHttpError(401, "Not authenticated"));
    }

    const tokens = createTokens(user);

    res.setHeader("refresh-token", tokens.refreshToken);
    res.setHeader("access-token", tokens.accessToken);
    req.userId = data.userId;

    next();
  };
