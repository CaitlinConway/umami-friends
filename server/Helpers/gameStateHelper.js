import { initialGame } from "../Constants/initialGameState.js";

const activeGames = {};
export const getGameState = (roomCode) => {
  let gameState = initialGame;
  if (activeGames[roomCode] === undefined) {
    gameState.roomCode = roomCode;
  } else {
    gameState = activeGames[roomCode];
  }
  return gameState;
};

export const updateGameState = (roomCode, gameState) => {
  activeGames[roomCode] = gameState;
};
export const deleteGameState = (roomCode) => {
  if (activeGames[roomCode]) {
    delete activeGames[roomCode];
  }
};
