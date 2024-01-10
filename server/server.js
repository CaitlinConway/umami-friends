// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors')
import { loadCommands } from './Helpers/socketCommands.mjs'

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',  // Replace with your React app's URL
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true,
  },
}
);


io.on('connection', (socket) => {
  loadCommands(socket, io)
});

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
