// import { shuffleRareRecipes } from "../Helpers/cardHelper.js";
// import { rareRecipes } from "../Constants/cards.js";
import rareRecipes from "../Constants/rareRecipes.json" assert { type: "json" };
import { shuffleCards } from "../Helpers/cardHelper.js";
import basicRecipes from "./basicRecipes.js";
export const initialGame = {
  roomCode: "",
  //either 2 or 4 users for valid game
  //user object should have name and character
  users: [],
  //10 rare recipes
  rareRecipes: shuffleCards(rareRecipes, 10),
  basicRecipes: basicRecipes,
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
};
