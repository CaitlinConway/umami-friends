export function messageHelper(socket, io, message, roomCode, userName) {
    io.sockets.in(roomCode).emit('message', `${userName}: ${message}`)
}
