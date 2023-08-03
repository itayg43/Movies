import jwtUtils from "./utils/jwt-utils";

const generateAccessToken = (payload: object) => {
  return jwtUtils.generateToken(
    payload,
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  );
};

const generateRefreshToken = (payload: object) => {
  return jwtUtils.generateToken(
    payload,
    process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
    { expiresIn: process.env.REFRESH_TOKEN_TTL }
  );
};

const generateTokens = (payload: object) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

export default {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
