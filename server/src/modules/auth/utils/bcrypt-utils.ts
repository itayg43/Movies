import bcryptjs from "bcryptjs";

const hashPassword = async (plainPassword: string) => {
  const salt = await bcryptjs.genSalt(10);
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
