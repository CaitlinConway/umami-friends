import { cardActionHelper } from "../Helpers/cardActionHelper.js";

const getOpponent = (userIndex) => (userIndex === 0 ? 1 : 0);

export default {
  healthySnack: {
    name: "Healthy Snack",
    pictureName: "healthySnack",
    points: 1,
    status: "basicPlant",
    cost: {
      ingredientPlant: 2,
    },
    energy: 1,
    description: "All other players draw +1 card.",
    getActions: () => [
      { actionType: "drawCards", data: { numberOfCards: 1, player: "others" } },
    ],
    pileCount: 6,
  },
  spicyRamen: {
    name: "Spicy Ramen",
    pictureName: "spicyRamen",
    points: 1,
    status: "basicSpicy",
    cost: {
      ingredientSpicy: 1,
      ingredientNoodle: 2,
    },
    energy: 0,
    description:
      "Name an Ingredient type. If the opponent has that type in their hand, they discard 1 card of that type from their hand of their choice. If they do not have that type, they show you their hand and discard one card of their choice.",
    getActions: (action, userIndex) => [
      {
        actionType: "prompt",
        data: {
          // TODO: update prompt data
          actionRequired: "discard",
          cardType: "Ingredient",
          cardName: action.data.selected[0],
          user: getOpponent(userIndex),
        },
      },
    ],
    pileCount: 5,
  },
  fancyBurger: {
    name: "Fancy Burger",
    pictureName: "fancyBurger",
    points: 2,
    status: "basicBurger",
    cost: {
      ingredientBurger: 1,
      ingredientSauce: 3,
    },
    energy: 0,
    description: "",
    getActions: () => [],
    pileCount: 5,
  },
  tacoParty: {
    name: "Taco Party",
    pictureName: "tacoParty",
    points: 3,
    status: "basicTaco",
    cost: {
      ingredientTaco: 4,
    },
    energy: 0,
    description:
      "Take an Ingredient card from your opponent's board. Add it to your board.",
    getActions: (action) => [
      {
        actionType: "stealCard",
        data: {
          numberOfCards: 1,
          selected: action.data.selected,
          from: "board",
        },
      },
    ],
    pileCount: 4,
  },
  niceCream: {
    name: "Nice Cream",
    pictureName: "niceCream",
    points: 4,
    status: "basicSweet",
    cost: {
      ingredientSweet: 4,
    },
    energy: 1,
    description: "Cannot be interacted with by an opponent.",
    getActions: () => [],
    pileCount: 3,
  },
  gardenSalad: {
    name: "Garden Salad",
    pictureName: "gardenSalad",
    points: 3,
    status: "advancedPlant",
    cost: {
      basicPlant: 3,
    },
    energy: 1,
    description: "(passive) Max Refresh +1 . All other players draw +2 cards.",
    getActions: () => [
      { actionType: "drawCards", data: { numberOfCards: 2, player: "others" } },
    ],
    pileCount: 3,
  },
  hotPot: {
    name: "Hot Pot",
    pictureName: "hotPot",
    points: 3,
    status: "advancedSpicy",
    cost: {
      basicSpicy: 3,
    },
    energy: 1,
    description: "Discard 1 Basic Recipe from your opponent's board.",
    getActions: (action) => [
      {
        actionType: "discardBasicBoard",
        data: {
          numberOfCards: 1,
          player: "others",
          selected: action.data.selected,
        },
      },
    ],
    pileCount: 3,
  },
  megaBurger: {
    name: "Megaburger",
    pictureName: "megaburger",
    points: 6,
    status: "advancedBurger",
    cost: {
      basicBurger: 3,
    },
    energy: 1,
    description:
      "(passive) Gain +1 Umami for every ingredient card on your board.",
    getActions: () => [],
    pileCount: 3,
  },
  bigBurrito: {
    name: "Big Burrito",
    pictureName: "bigBurrito",
    points: 6,
    status: "advancedTaco",
    cost: {
      basicTaco: 1,
      basicColorless: 2,
    },
    energy: 1,
    description:
      "Take 2 Ingredients from your opponent's board. Add them to your board.",
    getActions: (action) => [
      {
        actionType: "stealCard",
        data: {
          numberOfCards: 2,
          selected: action.data.selected,
          from: "board",
        },
      },
    ],
    pileCount: 2,
  },
  twiceCream: {
    name: "Twice Cream",
    pictureName: "twiceCream",
    points: 10,
    status: "advancedSweet",
    cost: {
      basicSweet: 2,
    },
    energy: 1,
    description: "Cannot be interacted with by an opponent.",
    getActions: () => [],
    pileCount: 2,
  },
};
