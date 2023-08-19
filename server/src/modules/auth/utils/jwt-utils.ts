import jwt from "jsonwebtoken";

const generateToken = (
  payload: object,
  privateKey: string,
  options?: jwt.SignOptions
) => {
  return jwt.sign(payload, privateKey, { ...options, algorithm: "RS256" });
};

const validateToken = (token: string, publicKey: string) => {
  try {
    const payload = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

    return {
      isValid: true,
      isExpired: false,
      payload,
    };
  } catch (error) {
    return {
      isValid: false,
      isExpired: error instanceof jwt.TokenExpiredError,
      payload: null,
    };
  }
};

export default {
  generateToken,
  validateToken,
};
