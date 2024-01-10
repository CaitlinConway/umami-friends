import { joinRoomHelper } from './roomHelper'
import { gameActionHelper } from './gameActionHelper'
import { messageHelper } from './messageHelper'

export function loadCommands(socket, io) {
    socket.on('create', (roomCode, userName) => joinRoomHelper(socket, io, roomCode, userName))
    socket.on('message', (message, roomCode, userName) => messageHelper(socket, io, message, roomCode, userName))
    socket.on('gameAction', (action, roomCode, userName) => gameActionHelper(socket, io, action, roomCode, userName))
}
