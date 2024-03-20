export const shuffleCards = (recipes, number) => {
  for (let i = recipes.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = recipes[i];
    recipes[i] = recipes[randomIndex];
    recipes[randomIndex] = temp;
  }
  //games start with 10 random recipes
  return recipes.slice(0, number);
};
//TODO: Replace with real function above
export const shuffleRareRecipes = (recipes) => {
  const firstRecipe = recipes[0];
  const copiedRecipes = Array(10).fill(firstRecipe);
  return copiedRecipes;
};

export const selectCards = (card) => {
  card.className = "selectedCards";
};
export const deselectCards = (card) => {
  card.className = "";
};

export const fillBasicRecipes = (basicRecipes) => {
  let basicRecipesArray = [];
  const basicRecipesTemplate = {
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
  };

  for (const key in basicRecipesTemplate) {
    const value = basicRecipesTemplate[key];
    const matchingRecipe = basicRecipes.filter((recipe) => recipe.name === key);
    basicRecipesArray.push(...Array(value).fill(matchingRecipe));
  }

  return basicRecipesArray;
};
