import * as dotenv from "dotenv";
dotenv.config();
import http from "http";

import app from "./app";

if (!process.env.PORT) {
  console.log("PORT was not provided");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL was not provided");
  process.exit(1);
}

// access token
if (!process.env.ACCESS_TOKEN_PRIVATE_KEY) {
  console.log("ACCESS_TOKEN_PRIVATE_KEY was not provided");
  process.exit(1);
}
if (!process.env.ACCESS_TOKEN_PUBLIC_KEY) {
  console.log("ACCESS_TOKEN_PUBLIC_KEY was not provided");
  process.exit(1);
}
if (!process.env.ACCESS_TOKEN_TTL) {
  console.log("ACCESS_TOKEN_TTL was not provided");
  process.exit(1);
}

// refresh token
if (!process.env.REFRESH_TOKEN_PRIVATE_KEY) {
  console.log("ACCESS_TOKEN_PRIVATE_KEY was not provided");
  process.exit(1);
}
if (!process.env.REFRESH_TOKEN_PUBLIC_KEY) {
  console.log("ACCESS_TOKEN_PUBLIC_KEY was not provided");
  process.exit(1);
}
if (!process.env.REFRESH_TOKEN_TTL) {
  console.log("ACCESS_TOKEN_TTL was not provided");
  process.exit(1);
}

const port = parseInt(process.env.PORT);
const server = http.createServer(app);

process.on("uncaughtException", (error) => {
  console.log(`Uncaught exception: ${error}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log(`Unhandled rejection: ${reason}`);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
