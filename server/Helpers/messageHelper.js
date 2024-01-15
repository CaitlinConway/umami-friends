export function messageHelper(socket, io, message, roomCode, userName) {
  console.log("in message helper", message);
  io.sockets.in(roomCode).emit("messaged", message, userName);
}
