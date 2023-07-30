import authDataAccess from "./auth-data-access";
import { InvalidCredentialsError } from "./auth-errors";
import bcryptUtils from "./utils/bcrypt-utils";
import { AuthDtoMapper } from "./auth-dto";

const authDtoMapper = new AuthDtoMapper();

const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcryptUtils.hashPassword(password);
  const user = await authDataAccess.registerUser(email, hashedPassword);
  return authDtoMapper.map(user);
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

  return authDtoMapper.map(user);
};

export default {
  registerUser,
  loginUser,
};
