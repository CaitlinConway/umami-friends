import { getGameState, updateGameState } from "./gameStateHelper.js";
import { ingredients } from "../Constants/cards.js";
import { shuffleCards } from "./cardHelper.js";
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
      gameState.users.forEach((user) => {
        user.hand = shuffleCards(ingredients, 5);
      });
      console.log("gameState", gameState);
      // gameState.users[userIndex].hand = shuffleCards(ingredients, 4);
      break;
    //TODO: update for 4p later
    case "endTurn":
      gameState.playerTurn === 1
        ? (gameState.playerTurn = 2)
        : (gameState.playerTurn = 1);
      break;
    case "startTurn":
      const sweetIngredients = gameState.users[userIndex].hand.filter(
        (ingredient) => ingredient.sweet >= 1
      );
      console.log("Sweet ingredients:", sweetIngredients);
      gameState.users[userIndex].hand = gameState.users[userIndex].hand.filter(
        (ingredient) => ingredient.sweet < 1
      );
      sweetIngredients && gameState.board.push(...sweetIngredients);
      gameState.users[gameState.playerturn - 1].energy = 1;
      break;
    case "drawCard":
      user.hand.push(shuffleCards(ingredients, 1)[0]);
      break;
  }
  updateGameState(roomCode, gameState);
  io.sockets.in(roomCode).emit("updateGameState", gameState);
}
