import _ from "lodash";

import authDataAccess from "./auth-data-access";
import {
  InvalidCredentialsError,
  ExpiredRefreshTokenError,
  InvalidRefreshTokenError,
} from "./auth-errors";
import {
  LoginUserInput,
  RegisterUserInput,
  ReissueUserAccessTokenInput,
} from "./auth-schemas";
import bcryptUtils from "./utils/bcrypt-utils";
import jwtUtils from "./utils/jwt-utils";
import authUtils from "./auth-utils";

const registerUser = async (registerInput: RegisterUserInput) => {
  const hashedPassword = await bcryptUtils.hashPassword(registerInput.password);
  const user = await authDataAccess.createUser(
    registerInput.name,
    registerInput.password,
    hashedPassword
  );

  return {
    ..._.omit(user, ["password"]),
    tokens: authUtils.generateTokens({
      id: user.id,
    }),
  };
};

const loginUser = async (loginInput: LoginUserInput) => {
  const user = await authDataAccess.findUserByEmail(loginInput.email);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const isValidPassword = await bcryptUtils.validatePassword(
    loginInput.password,
    user.password
  );

  if (!isValidPassword) {
    throw new InvalidCredentialsError();
  }

  return {
    ..._.omit(user, ["password"]),
    tokens: authUtils.generateTokens({
      id: user.id,
    }),
  };
};

const reissueUserAccessToken = (reissueInput: ReissueUserAccessTokenInput) => {
  const { isValid, isExpired, payload } = jwtUtils.validateToken(
    reissueInput.refreshToken,
    process.env.REFRESH_TOKEN_PUBLIC_KEY as string
  );

  if (!isValid) {
    if (isExpired) {
      throw new ExpiredRefreshTokenError();
    }

    throw new InvalidRefreshTokenError();
  }

  const p = payload as any;
  return authUtils.generateAccessToken({
    id: p.id,
  });
};

export default {
  registerUser,
  loginUser,
  reissueUserAccessToken,
};
