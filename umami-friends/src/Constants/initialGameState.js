import { shuffleRareRecipes } from "../Helpers/cardHelper.js";
import { rareRecipes } from "../Constants/cards.js";
// import rareRecipes from "../Constants/rareRecipes.json";
// import { shuffleCards } from "../Helpers/cardHelper.js";
export const initialGame = {
  roomCode: "",
  //either 2 or 4 users for valid game
  //user object should have name and character
  users: [],
  //10 rare recipes
  rareRecipes: shuffleRareRecipes(rareRecipes),
  basicRecipes: {
    healthySnack: 6,
    spicyRamen: 5,
    fancyBurger: 5,
    tacoParty: 4,
    niceCream: 3,
    gardenSalad: 3,
    hotPot: 3,
    megaBurger: 3,
    bigBurrito: 2,
    twiceCream: 2,
  },
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
