import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const createUserWatchlistItem = async (userId: number, movieId: number) => {
  return await prismaClient.watchlist.create({
    data: {
      userId,
      movieId,
    },
  });
};

const findUserActiveWatchlist = async (userId: number) => {
  return await prismaClient.watchlist.findMany({
    where: {
      status: "ACTIVE",
      userId,
    },
  });
};

const findUserActiveWatchlistItem = async (userId: number, movieId: number) => {
  return await prismaClient.watchlist.findFirst({
    where: {
      status: "ACTIVE",
      userId,
      movieId,
    },
  });
};

export default {
  createUserWatchlistItem,
  findUserActiveWatchlist,
  findUserActiveWatchlistItem,
};
