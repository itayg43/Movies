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
  const { name, email, password } = registerInput;

  const hashedPassword = await bcryptUtils.hashPassword(password);
  const user = await authDataAccess.createUser(name, email, hashedPassword);

  return {
    ..._.omit(user, ["password"]),
    tokens: authUtils.generateTokens({
      id: user.id,
    }),
  };
};

const loginUser = async (loginInput: LoginUserInput) => {
  const { email, password } = loginInput;

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
    ..._.omit(user, ["password"]),
    tokens: authUtils.generateTokens({
      id: user.id,
    }),
  };
};

const reissueUserAccessToken = (reissueInput: ReissueUserAccessTokenInput) => {
  const { refreshToken } = reissueInput;

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
  return authUtils.generateAccessToken({
    id: p.id,
  });
};

export default {
  registerUser,
  loginUser,
  reissueUserAccessToken,
};
