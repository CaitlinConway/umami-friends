import { getGameState, updateGameState } from "./gameStateHelper.js";

export function roomHelper(socket, io, roomCode, userName) {
  console.log(`roomHelper: ${roomCode}, ${userName}`);
  const gameState = getGameState(roomCode);
  const newUser = { name: userName, role: "" };
  const existingUser = gameState.users.find((user) => user.name === userName);
  if (existingUser < 0 || (!existingUser && userName)) {
    console.log(`${userName} joining ${roomCode}`);
    socket.join(roomCode);
    gameState.users.push(newUser);
    updateGameState(roomCode, gameState);
    io.sockets
      .in(roomCode)
      .emit("message", `User ${userName} joined room ${roomCode}`);
    io.to(socket.id).emit("joinedRoom", userName, roomCode);
    io.sockets.in(roomCode).emit("updateGameState", gameState);
  } else {
    io.to(socket.id).emit(
      "message",
      `User ${userName} already exists in room ${roomCode}`
    );
  }
}
