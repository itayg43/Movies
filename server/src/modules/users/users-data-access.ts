import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const createWatchList = async (movieId: number, userId: number) => {
  return await prismaClient.watchList.create({
    data: {
      movieId,
      userId,
    },
  });
};

const findFirstWatchListByMovieIdAndUserId = async (
  movieId: number,
  userId: number
) => {
  return await prismaClient.watchList.findFirst({
    where: {
      movieId,
      userId,
    },
  });
};

const findManyWatchListByUserId = async (userId: number) => {
  return await prismaClient.watchList.findMany({
    where: {
      userId,
    },
  });
};

const deleteWatchListById = async (id: number) => {
  await prismaClient.watchList.delete({
    where: {
      id,
    },
  });
};

export default {
  createWatchList,
  findFirstWatchListByMovieIdAndUserId,
  findManyWatchListByUserId,
  deleteWatchListById,
};
