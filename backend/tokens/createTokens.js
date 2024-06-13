import jwt from "jsonwebtoken";

export const createTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  return {
    accessToken, 
    refreshToken
  }
};
