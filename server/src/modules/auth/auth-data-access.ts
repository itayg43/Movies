import { PrismaClient, Prisma } from "@prisma/client";

import { ConflictEmailError } from "./auth-errors";

const UNIQUE_ERROR_CODE = "P2002";

const prismaClient = new PrismaClient();

const createUser = async (
  name: string,
  email: string,
  hashedPassword: string
) => {
  try {
    return await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === UNIQUE_ERROR_CODE
    ) {
      throw new ConflictEmailError();
    }

    throw error;
  }
};

const findUserById = async (id: number) => {
  return await prismaClient.user.findUnique({
    where: {
      id,
    },
  });
};

const findUserByEmail = async (email: string) => {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
};

export default {
  createUser,
  findUserById,
  findUserByEmail,
};
