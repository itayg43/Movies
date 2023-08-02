import authDataAccess from "./auth-data-access";
import { InvalidCredentialsError } from "./auth-errors";
import bcryptUtils from "./utils/bcrypt-utils";
import authUtils from "./auth-utils";

const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcryptUtils.hashPassword(password);
  const user = await authDataAccess.registerUser(email, hashedPassword);

  return {
    user,
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
    user,
    tokens: authUtils.generateTokens({ id: user.id }),
  };
};

const reissueUserTokens = (payload: object) => {
  return authUtils.generateTokens(payload);
};

export default {
  registerUser,
  loginUser,
  reissueUserTokens,
};
