// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors')

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

// app.use(cors({
//   origin: 'http://localhost:3000',  // Replace with your React app's URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('message', (message) => {
    console.log(`Message from ${socket.id}: ${message}`);
    io.emit('message', { user: 'Other User', text: message });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5050;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
