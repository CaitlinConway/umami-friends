// import { shuffleRareRecipes } from "../Helpers/cardHelper.js";
// import { rareRecipes } from "../Constants/cards.js";
import rareRecipes from "../Constants/rareRecipes.js";
import { shuffleCards } from "../Helpers/cardHelper.js";
import { ingredients } from "./cards.js";
import basicRecipes from "./basicRecipes.js";
export const initialGame = () => {
  const shuffledRareRecipes = shuffleCards(Object.values(rareRecipes), Object.keys(rareRecipes).length)
  return {
  roomCode: "",
  //either 2 or 4 users for valid game
  //user object should have name and character
  users: [],
  //10 rare recipes
  discardPile: [],
  ingredientsDrawPile: shuffleCards(ingredients, ingredients.length),
  recipesDrawPile: shuffledRareRecipes.splice(10),
  rareRecipes: shuffledRareRecipes.splice(0, 10),
  basicRecipes: Object.values(basicRecipes),
  playerTurn: 0,
  turnCount: 0,
  win: false,
  // player1Hand: [],
  // player2Hand: [],
  // player1Board: {
  //     //need to have candy items be objects to track what turn they were put down
  //     //candies can only be played the turn after getting
  //     candy: [],
  //     ingredients: []
  // },
  // player2Board: {
  //     candy: [],
  //     ingredients: []
  // },
  // player1Energy: 1,
  // player2Energy: 1,
  // player1Points: 0,
  // player2Points: 0,
}};
