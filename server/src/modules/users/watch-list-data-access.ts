import { PrismaClient, WatchListStatus } from "@prisma/client";

const prismaClient = new PrismaClient();

const createWatchList = async (userId: number, movieId: number) => {
  return await prismaClient.watchList.create({
    data: {
      userId,
      movieId,
    },
  });
};

const findWatchListById = async (id: number) => {
  return await prismaClient.watchList.findUnique({
    where: {
      id,
    },
  });
};

const findWatchList = async (userId: number, movieId: number) => {
  return await prismaClient.watchList.findFirst({
    where: {
      userId,
      movieId,
    },
  });
};

const findWatchListByUserId = async (userId: number) => {
  return await prismaClient.watchList.findMany({
    where: {
      status: "ACTIVE",
      userId,
    },
  });
};

const updateWatchListStatus = async (id: number, status: WatchListStatus) => {
  return await prismaClient.watchList.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

export default {
  createWatchList,
  findWatchListById,
  findWatchList,
  findWatchListByUserId,
  updateWatchListStatus,
};
