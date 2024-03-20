import { roomHelper } from './roomHelper.js';
import { gameActionHelper } from './gameActionHelper.js';
import { messageHelper } from './messageHelper.js';

export function loadCommands(socket, io) {
  socket.on('joinRoom', (roomCode, userName) =>
    roomHelper(socket, io, roomCode, userName)
  );
  socket.on('message', (message, roomCode, userName) =>
    messageHelper(socket, io, message, roomCode, userName)
  );
  socket.on('gameAction', (action, roomCode, userName) =>
    gameActionHelper(socket, io, action, roomCode, userName)
  );
}
