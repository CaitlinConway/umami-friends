export function messageHelper(socket, io, message, roomCode, userName) {
  console.log("in message helper", message, roomCode);
  try {
    io.sockets.in(roomCode).emit("message", message, userName);
    console.log("after emit");
  } catch (error) {
    console.error("Error emitting message to room", roomCode, error);
  }
}
