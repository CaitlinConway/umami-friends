import { getGameState, updateGameState } from "./gameStateHelper.js";
import { ingredients } from "../Constants/cards.js";
import { shuffleCards } from "./cardHelper.js";
export function cardActionHelper(action, gameState) {
  // const gameState = getGameState(roomCode);
  // const userIndex = gameState.users.findIndex((user) => user.name === userName);
  // const userRole = gameState.users[userIndex].role;
  // const currentPlayer = gameState.users[gameState.playerTurn - 1];
  switch (action.actionType) {
    // case "drawCards":
    //   //do some logic here for action.amount for how many to draw
    //   //also need logic if other players draw
    //   break;


    // case "addToZone":
    
    //   break;
    // case "removeFromZone":
      
    //   break;
    case "moveCard":
      //add intended object to the intended area (hand, board, discard pile, etc)
      !action.data.zone.to.user && gameState[action.zone.to.zoneName].push(action.data.cards)
      action.data.zone.to.user && gameState[users][action.data.zone.to.user][action.zone.to.zoneName].push(action.data.cards)

      //remove intended object from intended zone
      // !action.userName && gameState[action.zone].remove(action.target)
      // action.userName && gameState[users][action.userName][action.zone].remove(action.target)
      break;
    case "addEnergy":
      gameState.users[action.data.user].energy++
      break;
    case "removeEnergy":
      gameState.users[action.data.user].energy > 1 && gameState.users[action.player].energy--
      break;
    case "prompt":
      gameState.users[action.data.user].prompt = action.prompt
      break;
    case "drawCard":
      //select top card from either ingredient deck or recipe deck
      //target = name of top card of deck
      //gameActionHelper({actionType: 'addToZone', zone:'hand or board?' })
      //gameActionHelper({actionType: 'removeFromZone', zone:'ingredient deck or recipe deck?' })
      break;
      
    // case "retainRecipes":
    //   break;
    // case "refresh":
    //   //needs action.amount
    //   break;
    // case "placeIngredient":
    //   //add logic for action.amount
    //   break;
    // case "wish":
    //   //unlimited energy but can't draw
    //   break;
    // case "stealIngredient":
    //   //steal 2, discard 1, add one to hand
    //   break;
    // case "discardCard":
    //   break;
    // case "offering":
    //   //give opponent 2, discard basic or advanced recipe
    //   break;
    // case "stealRecipe":
    //   //steal and use immediately
    //   break;
    // case "fry":
    //   //oponent discards 4 ingredients
    //   break;

    // case "supremacy":
    //   //win game
    //   break;
    // case "useAbility":
    //   break;
    // case "swapHands":
    //   break;
    // case "gainUmami":
    //   //action.amount
    //   break;
    // case "sugarRush":
    //   //discard all sweets on boards and hands
    //   break;
  }
  // updateGameState(roomCode, gameState);
  // io.sockets.in(roomCode).emit("updateGameState", gameState);
}
