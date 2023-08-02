import jwtUtils from "./utils/jwt-utils";

const generateTokens = (payload: object) => {
  const accessToken = jwtUtils.generateToken(
    payload,
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  );

  const refreshToken = jwtUtils.generateToken(
    payload,
    process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
    { expiresIn: process.env.REFRESH_TOKEN_TTL }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export default {
  generateTokens,
};
