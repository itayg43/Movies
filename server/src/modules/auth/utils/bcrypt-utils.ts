import bcryptjs from "bcryptjs";

const DEFAULT_ROUNDS = 10;

const hashPassword = async (plainPassword: string) => {
  const salt = await bcryptjs.genSalt(DEFAULT_ROUNDS);
  return await bcryptjs.hash(plainPassword, salt);
};

const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return await bcryptjs.compare(plainPassword, hashedPassword);
};

export default {
  hashPassword,
  validatePassword,
};
