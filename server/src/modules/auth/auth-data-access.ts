import { PrismaClient, Prisma } from "@prisma/client";

import { EmailAddressAlreadyInUseError } from "./auth-errors";

const UNIQUE_ERROR_CODE = "P2002";

const prismaClient = new PrismaClient();

const registerUser = async (email: string, hashedPassword: string) => {
  try {
    return await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === UNIQUE_ERROR_CODE
    ) {
      throw new EmailAddressAlreadyInUseError();
    }

    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
};

export default {
  registerUser,
  getUserByEmail,
};
