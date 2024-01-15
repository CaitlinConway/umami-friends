import { getGameState, updateGameState } from "./gameStateHelper.js";

export function gameActionHelper(socket, io, action, roomCode, userName) {
  const gameState = getGameState(roomCode);
  const userIndex = gameState.users.findIndex((user) => user.name === userName);
  const userRole = gameState.users[userIndex].role;
  switch (action.actionType) {
    case "setRole":
      gameState.users[userIndex].role = action.role;
      break;
    case "startGame":
      gameState.playerTurn = 1;
      break;
    //TODO: update for 4p later
    case "endTurn":
      gameState.playerTurn === 1 ? gameState.playerTurn = 2 : gameState.playerTurn = 1;
      break;
  }
  updateGameState(roomCode, gameState);
  io.sockets.in(roomCode).emit("updateGameState", gameState);
}
