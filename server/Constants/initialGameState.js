// import { shuffleRareRecipes } from "../Helpers/cardHelper.js";
// import { rareRecipes } from "../Constants/cards.js";
import rareRecipes from "../Constants/rareRecipes.js";
import { shuffleCards } from "../Helpers/cardHelper.js";
import { ingredients } from "./cards.js";
import basicRecipes from "./basicRecipes.js";
export const initialGame = () => {
  const shuffledRareRecipes = shuffleCards(
    Object.values(rareRecipes),
    Object.keys(rareRecipes).length
  );
  const shuffledIngredients = shuffleCards(
    JSON.parse(JSON.stringify(ingredients)),
    ingredients.length
  );
  return {
    roomCode: "",
    //either 2 or 4 users for valid game
    //user object should have name and character
    users: [],
    //10 rare recipes
    discardPile: [],
    //five of each ingredient in draw pile
    ingredientsDrawPile: [
      ...shuffledIngredients,
      ...shuffledIngredients,
      ...shuffledIngredients,
      ...shuffledIngredients,
      ...shuffledIngredients,
    ],
    recipesDrawPile: shuffledRareRecipes.splice(10),
    rareRecipes: shuffledRareRecipes.splice(0, 10),
    basicRecipes: Object.values(basicRecipes),
    playerTurn: 0,
    turnCount: 0,
    win: false,
  };
};
