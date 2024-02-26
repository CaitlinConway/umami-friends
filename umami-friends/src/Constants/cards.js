//TODO: figure out a good way to handle actions from cards
//maybe an action list in each recipe object that can pass to a helper function
export const rareRecipes = [
  {
    name: "Spring Roll",
    pictureName: "springRoll",
    points: 2,
    status: "basicPlant",
    cost: {
      redTriangle: 1,
      greenCircle: 3,
    },
    energy: 1,
    description:
      "Place 2 ingredients from your hand onto your board. Refresh. All other players draw +1 card",
    actions: ["energy1", "placeIngredients2", "otherPlayersDraw"],
  },
];

export const basicRecipes = [
  {
    name: "Healthy Snack",
    pictureName: "healthySnack",
    points: 1,
    status: "basicPlant",
    cost: {
      greenCircle: 2,
    },
    energy: 1,
    description: "All other players draw +1 card",
    actions: ["otherPlayersDraw"],
  },
];

export const ingredients = [
  {
    name: "Bean Burger",
    pictureName: "beanBurger",
    value: {
      burger: 1,
      plant: 1,
      colorless: 0,
      spicy: 0,
      noodle: 0,
      sauce: 0,
      taco: 0,
      egg: 0,
      sweet: 0,
    },
  },
];
export const playerRoles = [
  {
    name: "Sasha",
    actions: [],
  },
  {
    name: "Coco",
    actions: [],
  },
  {
    name: "Damien",
    actions: [],
  },
  {
    name: "Fronk",
    actions: [],
  },
  {
    name: "Shinra",
    actions: [],
  },
  {
    name: "Ramona",
    actions: [],
  },
];

export const initialHandValue = {
  basicPlant: 0,
  basicSpicy: 0,
  basicBurger: 0,
  basicColorless: 0,
  basicTaco: 0,
  basicSweet: 0,
  ingredientPlant: 0,
  ingredientSauce: 0,
  ingredientNoodle: 0,
  ingredientTaco: 0,
  ingredientSweet: 0,
  ingredientSpicy: 0,
  ingredientBurger: 0,
  ingredientEgg: 0,
  advancedPlant: 0,
  advancedSpicy: 0,
  advancedBurger: 0,
  advancedColorless: 0,
  advancedTaco: 0,
  advancedSweet: 0,
  advancedBurger: 0,
};
