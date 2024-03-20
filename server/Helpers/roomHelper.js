import {
  deleteGameState,
  getGameState,
  updateGameState,
} from "./gameStateHelper.js";

export function roomHelper(socket, io, roomCode, userName) {
  console.log(`roomHelper: ${roomCode}, ${userName}`);
  const gameState = getGameState(roomCode);
  const newUser = {
    name: userName,
    role: "",
    hand: [],
    board: { candy: [], ingredients: [] },
    energy: 1,
    points: 0,
    maxRefresh: 5,
  };
  console.log(`${userName} joining ${roomCode}`);
  socket.join(roomCode);
  gameState.users.push(newUser);
  updateGameState(roomCode, gameState);
  io.sockets.in(roomCode).emit("joinedRoom", userName, roomCode);
  io.sockets.in(roomCode).emit("updateGameState", gameState);

  socket.on("disconnect", () => {
    gameState.users = gameState.users.filter(user => user.name !== userName);
    if (gameState.users.length === 0) {
      deleteGameState(roomCode);
    }
    socket.leave(roomCode);
    console.log(`${userName} disconnected from ${roomCode}`);
  });
}
