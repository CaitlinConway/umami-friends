import { getGameState, updateGameState } from "./gameStateHelper.js";
import { ingredients, playerRoles } from "../Constants/cards.js";
import basicRecipes from "../Constants/basicRecipes.js"
import roleCards from "../Constants/roleCards.js";
import rareRecipes from "../Constants/rareRecipes.js"
import { shuffleCards } from "./cardHelper.js";

const getOpponent = (userIndex) => userIndex === 0 ? 1 : 0;

const allCards = { ...basicRecipes, ...rareRecipes, ...roleCards, }

const moveCard = ({ fromStack, toStack, cards }) => {
  toStack?.push(...cards.map((each) => allCards[each]))
  let cardsToRemove = [...cards]
  fromStack = fromStack.filter(each => {
    if (cardsToRemove.includes(each.pictureName)) {
      cardsToRemove = cardsToRemove.filter(cardName => cardName === each.pictureName)
      return false;
    }
    return true;
  })
}

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export function gameActionHelper(socket, io, action, roomCode, userName) {
  const gameState = getGameState(roomCode);
  const userIndex = gameState.users.findIndex((user) => user.name === userName);
  const userRole = gameState.users[userIndex]?.role;
  const currentPlayer = gameState.users[gameState.playerTurn - 1];
  let ingredientsCopy = [...ingredients];

  let playerIndex;
  let fromStack;
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
      const cardActions = allCards[action.data.card].getActions(action, userIndex, gameState);
      cardActions.forEach((cardAction) => gameActionHelper(socket, io, cardAction, roomCode, userName))
      break;
    case "buyCard":
      break;

    /* Below actionTypes are mainly used for useCard and buyCard */

    /* Data required: player, numberOfCards */
    case "drawCards":
      playerIndex = action.data.player === 'others' ? getOpponent(userIndex) : userIndex
      moveCard({
        fromStack: gameState.ingredientsDrawPile,
        toStack: gameState.users[playerIndex].hand,
        cards: Array(action.data.numberOfCards).keys().map(index => gameState.ingredientsDrawPile[index])
      })
      break;

    /* Data required: from, to, selected */
    case "moveCard":
      const fromUser = action.data.from.user;
      const fromZone = action.data.from.zone;
      const toUser = action.data.to.user;
      const toZone = action.data.to.zone;
      const fromStack = fromUser ? gameState.users[fromUser][fromZone] : gameState[fromZone]
      const toStack = toUser ? gameState.users[toUser][toZone] : gameState[toZone]

      moveCard({
        fromStack,
        toStack,
        cards: [...action.data.selected]
      })
      break;

    /* Data required: selected (cards), numberOfCards, from (hand or board) */
    case "stealCard":
      if (action.data.numberOfCards !== action?.data?.selected?.length) {
        throw Error('Number of cards is incorrect.')
      }
      fromStack = action.data.from === 'board' ? gameState.users[getOpponent(userIndex)].board.ingredients : gameState.users[getOpponent(userIndex)].hand
      moveCard({
        fromStack,
        toStack: gameState.users[userIndex].board.ingredients,
        cards: [...action.data.selected]
      })
      break;

    case "giveCard":
      const { from } = action.data
      if (action.data.numberOfCards !== action?.data?.selected?.length) {
        throw Error('Number of cards is incorrect.')
      }
      fromStack = action.data.from === 'board' ? gameState.users[userIndex].board.ingredients : gameState.users[userIndex].hand
      moveCard({
        fromStack,
        toStack: gameState.users[getOpponent(userIndex)].board.ingredients,
        cards: [...action.data.selected]
      })
      break;

    // Discard Basic Recipe from player's board.
    /* Data required: selected (cards), numberOfCards, player */
    case "discardBasicBoard":
      if (action.data.numberOfCards !== action.data?.selected?.length) {
        throw Error('Number of cards is incorrect.')
      }
      playerIndex = action.data.player === 'others' ? getOpponent(userIndex) : userIndex
      moveCard({
        fromStack: gameState.users[playerIndex].board.ingredients,
        toStack: gameState.basicRecipes,
        cards: [...action.data.selected]
      })
      break;

    /* Data required: selected (cards), numberOfCards, player, from */
    case "discardCard":
      if (action.data.numberOfCards !== action.data?.selected?.length) {
        throw Error('Number of cards is incorrect.')
      }
      playerIndex = action.data.player === 'others' ? getOpponent(userIndex) : userIndex
      fromStack = action.data.from === 'board' ? gameState.users[playerIndex].board.ingredients : gameState.users[playerIndex].hand
      moveCard({
        fromStack,
        toStack: gameState.discardPile,
        cards: [...action.data.selected]
      })
      break;

    case "retainRecipes":
      break;

    /* Data required: n/a */
    case "refresh":
      const numberOfCards = gameState.users[userIndex].maxRefresh - gameState.users[userIndex].hand.length
      return gameActionHelper(socket, io, { actionType: 'drawCards', data: { player: 'self', numberOfCards } }, roomCode, userName)

    /* Data required: selected (cards), numberOfCards */
    case "placeIngredient":
      if (action.data?.numberOfCards !== action.data?.selected?.length) {
        throw Error('Number of cards is incorrect.')
      }
      moveCard({
        fromStack: gameState.users[userIndex].hand,
        toStack: gameState.users[userIndex].board.ingredients,
        cards: [...action.data.selected]
      })
      break;

    /* Data required: n/a */
    case "swapHands":
      const currentHand = deepCopy(gameState.users[userIndex].hand)
      gameState.users[userIndex].hand = deepCopy(gameState.users[getOpponent(userIndex)].hand)
      gameState.users[getOpponent(userIndex)].hand = currentHand
      break;

      /* Data required: numberOfCards, selected */
    case "discardAndRefillRare":
      if (action.data?.numberOfCards !== action.data?.selected?.length) {
        throw Error('Number of cards is incorrect.')
      }
      moveCard({
        fromStack: gameState.rareRecipes,
        cards: [...action.data.selected]
      })
      moveCard({
        fromStack: gameState.recipesDrawPile,
        toStack: gameState.rareRecipes,
        cards: Array(action.data.numberOfCards).keys().map(index => gameState.recipesDrawPile[index])
      })
      break;

    case "addEnergy":
      const playeradd = gameState.users.findIndex((user) => user.name === action.data.username);
      gameState.users[playeradd].energy++
      break;
    case "removeEnergy":
      const playerremove = gameState.users.findIndex((user) => user.name === action.data.username);
      gameState.users[playerremove].energy > 1 && gameState.users[playerremove].energy--
      break;
    case "prompt":
      //TODO: add prompt
      break;
  }
  // TODO: Recaculate point and max refresh
  updateGameState(roomCode, gameState);
  io.sockets.in(roomCode).emit("updateGameState", gameState);
}
