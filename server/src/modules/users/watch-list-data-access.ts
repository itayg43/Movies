import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const createWatchList = async (userId: number, movieId: number) => {
  return await prismaClient.watchList.create({
    data: {
      userId,
      movieId,
    },
  });
};

const isWatchListExist = async (userId: number, movieId: number) => {
  const watchList = await prismaClient.watchList.findFirst({
    where: {
      userId,
      movieId,
    },
  });

  return !!watchList;
};

const isWatchListExistById = async (id: number) => {
  const watchList = await prismaClient.watchList.findUnique({
    where: {
      id,
    },
  });

  return !!watchList;
};

const findWatchList = async (userId: number) => {
  return await prismaClient.watchList.findMany({
    where: {
      status: "ACTIVE",
      userId,
    },
  });
};

const softDeleteWatchList = async (id: number) => {
  await prismaClient.watchList.update({
    where: {
      id,
    },
    data: {
      status: "DELETED",
    },
  });
};

export default {
  createWatchList,
  isWatchListExist,
  isWatchListExistById,
  findWatchList,
  softDeleteWatchList,
};
