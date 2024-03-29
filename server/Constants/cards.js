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
      ingredientBurger: 1,
      ingredientPlant: 1,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Pepper",
    pictureName: "pepper",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 1,
      ingredientColorless: 0,
      ingredientSpicy: 1,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Pesto",
    pictureName: "pesto",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 1,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 1,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Zoodles",
    pictureName: "zoodles",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 1,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 1,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Nopales Taco",
    pictureName: "nopalesTaco",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 1,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 1,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Spaghetti",
    pictureName: "spaghetti",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 2,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Ketchup",
    pictureName: "ketchup",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 2,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Tsuyu",
    pictureName: "tsuyu",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 1,
      ingredientSauce: 1,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Hot Sauce",
    pictureName: "hotSauce",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 1,
      ingredientNoodle: 0,
      ingredientSauce: 1,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Ghost Taco",
    pictureName: "ghostTaco",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 1,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 1,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Guacamole",
    pictureName: "guacamole",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 1,
      ingredientTaco: 1,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Carrot",
    pictureName: "carrot",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 1,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Burger",
    pictureName: "burger",
    value: {
      ingredientBurger: 1,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Taco",
    pictureName: "taco",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 1,
      ingredientEgg: 0,
      ingredientSweet: 0,
    },
  },
  {
    name: "Ice Cream",
    pictureName: "iceCream",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 1,
    },
  },
  {
    name: "Mochi Donut",
    pictureName: "mochiDonut",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 1,
    },
  },
  {
    name: "Fruit Snacks",
    pictureName: "fruitSnacks",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 0,
      ingredientSweet: 1,
    },
  },
  {
    name: "Egg",
    pictureName: "egg",
    value: {
      ingredientBurger: 0,
      ingredientPlant: 0,
      ingredientColorless: 0,
      ingredientSpicy: 0,
      ingredientNoodle: 0,
      ingredientSauce: 0,
      ingredientTaco: 0,
      ingredientEgg: 1,
      ingredientSweet: 0,
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
