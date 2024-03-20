import { getGameState, updateGameState } from "./gameStateHelper.js";
import { ingredients, playerRoles } from "../Constants/cards.js";
import basicRecipes from "../Constants/basicRecipes.js";
import roleCards from "../Constants/roleCards.js";
import rareRecipes from "../Constants/rareRecipes.js";
import { shuffleCards } from "./cardHelper.js";

const allCards = { ...basicRecipes, ...rareRecipes, ...roleCards };

export function gameActionHelper(socket, io, action, roomCode, userName) {
  const gameState = getGameState(roomCode);
  const userIndex = gameState.users.findIndex((user) => user.name === userName);
  const userRole = gameState.users[userIndex]?.role;
  const currentPlayer = gameState.users[gameState.playerTurn - 1];
  let ingredientsCopy = [...ingredients];
  switch (action.actionType) {
    case "setRole":
      gameState.users[userIndex].role = action.role;
      break;
    case "startGame":
      gameState.playerTurn = 1;
      gameState.users.forEach((user) => {
        user.hand = shuffleCards(ingredientsCopy, 5);
      });
      gameState.turnCount = 1;
      console.log("gameState", JSON.stringify(gameState));
      // gameState.users[userIndex].hand = shuffleCards(ingredients, 4);
      break;
    //TODO: update for 4p later
    case "endTurn":
      //TODO: add logic for handling discard
      currentPlayer.energy = 1;
      gameState.playerTurn === 1
        ? (gameState.playerTurn = 2)
        : (gameState.playerTurn = 1);
      gameState.turnCount++;
      break;
    case "startTurn":
      const sweetIngredients = currentPlayer.hand.filter(
        (ingredient) => ingredient.value.ingredientSweet >= 1
      );
      currentPlayer.hand = currentPlayer.hand.filter(
        (ingredient) => ingredient.value.ingredientSweet < 1
      );
      sweetIngredients && currentPlayer.board.candy.push(...sweetIngredients);
      currentPlayer.energy = 1;
      break;
    case "drawCard":
      currentPlayer.hand.push(...shuffleCards(ingredientsCopy, 3));
      currentPlayer.energy--;
      break;
    case "useCard":
      const cardActions = allCards[action.data.card].getActions(
        action.data,
        userIndex,
        gameState
      );
      cardActions.forEach((cardAction) =>
        gameActionHelper(socket, io, cardAction, roomCode, userName)
      );
      break;
    case "buyCard":
      break;
    case "moveCard":
      // add card to the intended area (hand, board, discard pile, etc)
      if (![0, 1].includes(action.data.zone.to.user)) {
        gameState[action.data.zone.to.zoneName].push(
          action.data.cards.map((each) => allCards[each])
        );
      } else {
        if (action.data.zone.to.zoneName === "board") {
          const cardsDetails = action.data.cards.map((each) => allCards[each]);
          const candyCards = cardsDetails.filter(
            (each) => each?.value?.ingredientSweet
          );
          const ingredientCards = cardsDetails.filter(
            (each) => !each?.value?.ingredientSweet
          );

          gameState["users"][action.data.zone.to.user].board.candy.push(
            candyCards
          );
          gameState["users"][action.data.zone.to.user].board.ingredients.push(
            ingredientCards
          );
        } else {
          gameState["users"][action.data.zone.to.user][
            action.data.zone.to.zoneName
          ].push(action.data.cards.map((each) => allCards[each]));
        }
      }

      // remove card from the intended area (hand, board, discard pile, etc)
      let cardsToRemove = [...action.data.cards];
      if (![0, 1].includes(action.data.zone.from.user)) {
        gameState[action.data.zone.from.zoneName] = gameState[
          action.data.zone.from.zoneName
        ].filter((each) => {
          if (cardsToRemove.includes(each.pictureName)) {
            cardsToRemove = cardsToRemove.filter(
              (cardName) => cardName === each.pictureName
            );
            return false;
          }
          return true;
        });
      } else {
        gameState["users"][action.data.zone.from.user][
          action.data.zone.from.zoneName
        ] = gameState["users"][action.data.zone.from.user][
          action.data.zone.from.zoneName
        ].filter((each) => {
          if (!cardsToRemove.includes(each.pictureName)) {
            return true;
          }
          cardsToRemove = cardsToRemove.filter(
            (cardName) => cardName !== each.pictureName
          );
          return false;
        });
      }
      break;
    case "addEnergy":
      const playeradd = gameState.users.findIndex(
        (user) => user.name === action.data.username
      );
      gameState.users[playeradd].energy++;
      break;
    case "removeEnergy":
      const playerremove = gameState.users.findIndex(
        (user) => user.name === action.data.username
      );
      gameState.users[playerremove].energy > 1 &&
        gameState.users[playerremove].energy--;
      break;
    case "prompt":
      //TODO: add prompt
      break;
  }
  // TODO: Recaculate and max refresh
  updateGameState(roomCode, gameState);
  io.sockets.in(roomCode).emit("updateGameState", gameState);
}
