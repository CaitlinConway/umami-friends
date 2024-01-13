// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { loadCommands } from './Helpers/socketCommands.js'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',  // Replace with your React app's URL
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true,
  },
}
);


io.on('connection', (socket) => {
  console.log("connected")
  loadCommands(socket, io)
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
