// server.js
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { loadCommands } from "./Helpers/socketCommands.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
  },
});

io.on("connection", socket => {
  console.log("connected");
  loadCommands(socket, io);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
