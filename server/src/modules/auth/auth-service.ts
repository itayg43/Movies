import authDataAccess from "./auth-data-access";
import { InvalidCredentialsError } from "./auth-errors";
import bcryptUtils from "./utils/bcrypt-utils";
import authUtils from "./auth-utils";

const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcryptUtils.hashPassword(password);
  const user = await authDataAccess.createUser(email, hashedPassword);

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

const reissueUserAccessToken = (userId: number) => {
  return authUtils.generateAccessToken({ id: userId });
};

export default {
  registerUser,
  loginUser,
  reissueUserAccessToken,
};
