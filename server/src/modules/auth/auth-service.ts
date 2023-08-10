import authDataAccess from "./auth-data-access";
import {
  InvalidCredentialsError,
  ExpiredRefreshTokenError,
  InvalidRefreshTokenError,
} from "./auth-errors";
import bcryptUtils from "./utils/bcrypt-utils";
import jwtUtils from "./utils/jwt-utils";
import authUtils from "./auth-utils";

const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcryptUtils.hashPassword(password);
  const user = await authDataAccess.createUser(name, email, hashedPassword);

  return {
    user,
    tokens: authUtils.generateTokens({ id: user.id }),
  };
};

const loginUser = async (email: string, password: string) => {
  const user = await authDataAccess.findUserByEmail(email);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const isValidPassword = await bcryptUtils.validatePassword(
    password,
    user.password
  );

  if (!isValidPassword) {
    throw new InvalidCredentialsError();
  }

  return {
    user,
    tokens: authUtils.generateTokens({ id: user.id }),
  };
};

const reissueUserAccessToken = (refreshToken: string) => {
  const { isValid, isExpired, payload } = jwtUtils.validateToken(
    refreshToken,
    process.env.REFRESH_TOKEN_PUBLIC_KEY as string
  );

  if (!isValid) {
    if (isExpired) {
      throw new ExpiredRefreshTokenError();
    }

    throw new InvalidRefreshTokenError();
  }

  const p = payload as any;
  return authUtils.generateAccessToken({ id: p.id });
};

export default {
  registerUser,
  loginUser,
  reissueUserAccessToken,
};
