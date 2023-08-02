import authDataAccess from "./auth-data-access";
import {
  InvalidCredentialsError,
  InvalidRefreshTokenError,
  ExpiredRefreshTokenError,
} from "./auth-errors";
import bcryptUtils from "./utils/bcrypt-utils";
import authUtils from "./auth-utils";
import { AuthDtoMapper } from "./auth-dto";
import jwtUtils from "./utils/jwt-utils";

const authDtoMapper = new AuthDtoMapper();

const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcryptUtils.hashPassword(password);
  const user = await authDataAccess.registerUser(email, hashedPassword);

  return {
    ...authDtoMapper.map(user),
    tokens: authUtils.generateTokens({ id: user.id }),
  };
};

const loginUser = async (email: string, password: string) => {
  const user = await authDataAccess.getUserByEmail(email);

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
    ...authDtoMapper.map(user),
    tokens: authUtils.generateTokens({ id: user.id }),
  };
};

const reissueUserTokens = (refreshToken: string) => {
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

  return authUtils.generateTokens({ id: p.id });
};

export default {
  registerUser,
  loginUser,
  reissueUserTokens,
};
