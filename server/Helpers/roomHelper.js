import { getGameState, updateGameState } from './gameStateHelper';

export function joinRoomHelper(socket, io, roomCode, userName) {
    const gameState = getGameState(roomCode)
    const newUser = { name: userName, role: '' }
    const existingUser = gameState.users.find(user => user.name === userName)
    if (existingUser < 0 && userName) {
        socket.join(roomCode)
        gameState.users.push(newUser)
        updateGameState(roomCode, gameState)
        io.to(socket.id).emit('message', `User ${userName} joined room ${roomCode}`)
        io.to(socket.id).emit('joinedRoom', userName, roomCode)
        io.sockets.in(roomCode).emit('updateGameState', gameState)
    }
    else {
        io.to(socket.id).emit('message', `User ${userName} already exists in room ${roomCode}`)
    }
}
