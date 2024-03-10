const getOpponent = (currentPlayer) => currentPlayer === 0 ? 1 : 0;

export default {
  balancedMeal: {
    "name": "Balanced Meal",
    "pictureName": "balancedMeal",
    "points": 1,
    "value": {
      "basicColorless": 1
    },
    "cost": {
      "basicPlant": 1,
      "basicSpicy": 1,
      "basicBurger": 1
    },
    "energy": 1,
    "description": "Retain all Recipes used to complete this. Draw +1 card.",
    "actions": ["Harmony"]
  },
  tofu: {
    "name": "Tofu",
    "pictureName": "tofu",
    "points": 1,
    "value": {
      "basicRainbow": 1
    },
    "cost": {
      "basicColorless": 2
    },
    "energy": 1,
    "description": "",
    "actions": ["Morph"]
  },
  springRoll: {
    "name": "Spring Roll",
    "pictureName": "springRoll",
    "points": 2,
    "value": {
      "basicPlant": 1
    },
    "cost": {
      "basicColorless": 1,
      "ingredientPlant": 3
    },
    "energy": 1,
    "description": "Place 2 Ingredients from your hand onto your board. Refresh (but your turn does not end). All other players draw +2 cards.",
    "actions": ["Fresh"]
  },
  lettuceWrap: {
    "name": "Lettuce Wrap",
    "pictureName": "lettuceWrap",
    "points": 4,
    "value": {
      "advancedPlant": 1
    },
    "cost": {
      "basicPlant": 2,
      "ingredientSauce": 3
    },
    "energy": 1,
    "description": "(passive) At the end of your turn, you may place +1 Ingredient from your hand onto your board. If you do, all other players draw +1 card.",
    "actions": ["Restore"]
  },
  greatLeaf: {
    "name": "Great Leaf",
    "pictureName": "greatLeaf",
    "points": 8,
    "value": {
      "legendaryPlant": 1
    },
    "cost": {
      "advancedPlant": 2,
      "ingredientPlant": 4
    },
    "energy": 1,
    "description": "Draw +5 cards. You may take unlimited Energy this turn, but can no longer draw additional cards this turn.",
    "actions": ["Wish"]
  },
  padThai: {
    "name": "Pad Thai",
    "pictureName": "padThai",
    "points": 2,
    "value": {
      "basicSpicy": 1
    },
    "cost": {
      "basicColorless": 1,
      "ingredientNoodle": 4
    },
    "energy": 1,
    "description": "View any player\u2019s hand. Take any 2 Ingredients from their hand or board. Discard 1, and add 1 to your board.",
    "actions": ["Stir-Fry"]
  },
  bubblingCurry: {
    "name": "Bubbling Curry",
    "pictureName": "bubblingCurry",
    "points": 4,
    "value": {
      "advancedSpicy": 1
    },
    "cost": {
      "basicSpicy": 2,
      "ingredientPlant": 3
    },
    "energy": 0,
    "description": "You must give your opponent 2 Recipes to activate this ability, otherwise this card does nothing. Discard an opponent's Basic or Advanced Recipe.",
    "actions": ["Offering"]
  },
  volcanoPot: {
    "name": "Volcano Pot",
    "pictureName": "volcanoPot",
    "points": 0,
    "value": {
      "legendarySpicy": 1
    },
    "cost": {
      "advancedSpicy": 2,
      "ingredientNoodle": 4
    },
    "energy": 1,
    "description": "Steal an opponent's Recipe and use its active ability immediately.",
    "actions": ["Immolate"]
  },
  burgerBrothers: {
    "name": "Burger Brothers",
    "pictureName": "burgerBrothers",
    "points": 6,
    "value": {
      "basicBurger": 1
    },
    "cost": {
      "basicBurger": 2
    },
    "energy": 1,
    "description": "(passive) Gain +1 Umami for every Ingredient on your board.",
    "actions": ["Kingdom"]
  },
  chickenSandwich: {
    "name": "Chicken Sandwich",
    "pictureName": "chickenSandwich",
    "points": 8,
    "value": {
      "advancedBurger": 1
    },
    "cost": {
      "basicBurger": 2,
      "ingredientSpicy": 3
    },
    "energy": 0,
    "description": "Your opponent discards down to 4 Ingredients total between their hand and board.",
    "actions": ["Fry"]
  },
  theOmegaburger: {
    "name": "The OmegaBurger",
    "pictureName": "theOmegaburger",
    "points": 30,
    "value": {
      "legendaryBurger": 1
    },
    "cost": {
      "advancedBurger": 2,
      "ingredientSauce": 4
    },
    "energy": 0,
    "description": "Upon pickup, win the game.",
    "actions": ["Supremacy"]
  },
  tamaleTwins: {
    "name": "Tamale Twins",
    "pictureName": "tamaleTwins",
    "points": 6,
    "value": {
      "advancedTaco": 1
    },
    "cost": {
      "basicTaco": 2
    },
    "energy": 1,
    "description": "Use the active ability of any Recipe on your board.",
    "actions": ["Double-Up"]
  },
  tacoSalad: {
    "name": "Taco Salad",
    "pictureName": "tacoSalad",
    "points": 6,
    "value": {
      "advancedTaco": 1
    },
    "cost": {
      "advancedPlant": 1,
      "basicTaco": 1
    },
    "energy": 1,
    "description": "(passive) Max Refresh +2.",
    "actions": ["Tossed"]
  },
  tortillaSoup: {
    "name": "Tortilla Soup",
    "pictureName": "tortillaSoup",
    "points": 6,
    "value": {
      "advancedTaco": 1
    },
    "cost": {
      "advancedSpicy": 1,
      "basicTaco": 1
    },
    "energy": 1,
    "description": "Discard a card from your own hand, then swap hands with an opponent.",
    "actions": ["Submerge"]
  },
  emperorTorta: {
    "name": "Emperor Torta",
    "pictureName": "emperorTorta",
    "points": 5,
    "value": {
      "advancedTaco": 1
    },
    "cost": {
      "advancedBurger": 1,
      "basicTaco": 1
    },
    "energy": 0,
    "description": "Add 2 Fancy Burgers to your Board. (passive) All Recipes are now worth +1 Umami (including Emperor Torta).",
    "actions": ["Subjects"]
  },
  massiveBurrito: {
    "name": "Massive Burrito",
    "pictureName": "massiveBurrito",
    "points": 16,
    "value": {
      "LegendaryTaco": 1
    },
    "cost": {
      "advancedTaco": 1,
      "advancedColorless": 1,
      "ingredientTaco": 4
    },
    "energy": 1,
    "description": "You may view and spend ingredient cards from both you and an opponent\u2019s hand and board this turn, but can no longer draw additional cards this turn. At the end of the turn, all players Refresh.",
    "actions": ["Envelop"]
  },
  verySourCandy: {
    "name": "Very Sour Candy",
    "pictureName": "verySourCandy",
    "points": 3,
    "value": {
      "basicSweet": 1
    },
    "cost": {
      "basicColorless": 1,
      "ingredientSweet": 2
    },
    "energy": 0,
    "description": "View any players' hand. Take up to 2 Sweets from their hand and place them on your board.",
    "actions": ["Pucker"]
  },
  hyperTreat: {
    "name": "Hyper Treat",
    "pictureName": "hyperTreat",
    "points": 8,
    "value": {
      "advancedSweet": 1
    },
    "cost": {
      "ingredientSweet": 6
    },
    "energy": 1,
    "description": "All players discard their Sweets on the board and in their hand. Immediately shuffle the discard pile back into the deck.",
    "actions": ["Sugar Rush"]
  },
  chocoberryCake: {
    "name": "Chocoberry Cake",
    "pictureName": "chocoberryCake",
    "points": 12,
    "value": {
      "legendarySweet": 1
    },
    "cost": {
      "advancedSweet": 1,
      "ingredientSweet": 3
    },
    "energy": 0,
    "description": "(passive) Gain +2 Umami for every additional Sweet on your board.",
    "actions": ["Petit Fours"]
  },
  veggieNuggets: {
    "name": "Veggie Nuggets",
    "pictureName": "veggieNuggets",
    "points": 1,
    "value": {
      "basicPlant": 1
    },
    "cost": {
      "ingredientPlant": 5
    },
    "energy": 1,
    "description": "Retain Ingredients used to make this Recipe. Show your opponent your hand. Search the Rare Deck for Spicy Nuggets or Saucy Nuggets. Place 1 in the Rare Recipe market in the place of Veggie Nuggets.",
    "actions": ["Friendship"]
  },
  spicyNuggets: {
    "name": "Spicy Nuggets",
    "pictureName": "spicyNuggets",
    "points": 2,
    "value": {
      "basicSpicy": 1
    },
    "cost": {
      "ingredientSpicy": 4
    },
    "energy": 1,
    "description": "Retain Ingredients used to make this Recipe. Show your opponent your hand. Search the Rare Deck for Veggie Nuggets or Saucy Nuggets. Place 1 in the Rare Recipe market in the place of Spicy Nuggets.",
    "actions": ["Friendship"]
  },
  saucyNuggets: {
    "name": "Saucy Nuggets",
    "pictureName": "saucyNuggets",
    "points": 3,
    "value": {
      "basicBurger": 1
    },
    "cost": {
      "ingredientSauce": 5
    },
    "energy": 0,
    "description": "Retain Ingredients used to make this Recipe. Show your opponent your hand. Search the Rare Deck for Veggie Nuggets or Spicy Nuggets. Place 1 in the Rare Recipe market in the place of Saucy Nuggets.",
    "actions": ["Friendship"]
  },
  fruitSalad: {
    "name": "Fruit Salad",
    "pictureName": "fruitSalad",
    "points": 6,
    "value": {
      "advancedPlant": 1
    },
    "cost": {
      "basicPlant": 1,
      "basicSweet": 1,
      "ingredientPlant": 3
    },
    "energy": 1,
    "description": "(passive) Healthy Snacks are now worth 4 Umami (instead of 1). All other players draw +2 cards.",
    "actions": ["Transmute"]
  },
  spiceCream: {
    "name": "Spice Cream",
    "pictureName": "spiceCream",
    "points": 6,
    "value": {
      "advancedSpicy": 1
    },
    "cost": {
      "basicSpicy": 1,
      "basicSweet": 1,
      "ingredientSpicy": 3
    },
    "energy": 1,
    "description": "Steal any one of your opponents' Basic Recipes, including Sweet Types (ignore Frozen effect). Use its active ability immediately.",
    "actions": ["Melt"]
  },
  fruitSando: {
    "name": "Fruit Sando",
    "pictureName": "fruitSando",
    "points": 4,
    "value": {
      "basicBurger": 1
    },
    "cost": {
      "ingredientBurger": 1,
      "ingredientSweet": 2
    },
    "energy": 0,
    "description": "(passive) The opponent may discard this card from your board on their turn for the cost of 3 Sweets.",
    "actions": ["Impressionable"]
  },
  paletas: {
    "name": "Paletas",
    "pictureName": "paletas",
    "points": 6,
    "value": {
      "basicSweet": 1
    },
    "cost": {
      "basicTaco": 1,
      "ingredientSweet": 2
    },
    "energy": 1,
    "description": "Discard 3 Recipes from the Rare recipe market. Immediately refill the market.",
    "actions": ["Fresh"]
  },
  soupSalad: {
    "name": "Soup & Salad",
    "pictureName": "soupSalad",
    "points": 6,
    "value": {
      "advancedRainbow": 1
    },
    "cost": {
      "advancedSpicy": 1,
      "advancedPlant": 1
    },
    "energy": 0,
    "description": "Discard 1 Recipe from the Rare Recipe market. Immediately refill the market.",
    "actions": ["Substitute"]
  },
  plainSandwich: {
    "name": "Plain Sandwich",
    "pictureName": "plainSandwich",
    "points": 3,
    "value": {
      "basicRainbow": 1
    },
    "cost": {
      "advancedColorless": 1,
      "ingredientBurger": 1
    },
    "energy": 0,
    "description": "Give this to an opponent. They must return 1 Basic or Advanced Rare Recipe of their choice to the Rare Recipe market. If they do not have a Rare Recipe, this ability does nothing.",
    "actions": ["Flavorless"]
  },
  umi: {
    "name": "Umi",
    "pictureName": "umi",
    "points": 3,
    "value": {
      "basicRainbow": 1
    },
    "cost": {
      "advancedPlant": 1,
      "advancedSpicy": 1,
      "advancedBurger": 1
    },
    "energy": 1,
    "description": "Retain all Recipes used to complete this. All players may place any amount of Ingredients from their hand onto their board.",
    "actions": ["Equilibrium"]
  },
  okonomiyaki: {
    "name": "Okonomiyaki",
    "pictureName": "okonomiyaki",
    "points": 3,
    "value": {
      "basicRainbow": 1
    },
    "cost": {
      "basicColorless": 1,
      "ingredientEgg": 1,
      "ingredientPlant": 1,
      "ingredientSpicy": 1,
      "ingredientNoodle": 1,
      "ingredientSauce": 1
    },
    "energy": 1,
    "description": "Name an Ingredient type. If the opponent has that type in their hand, they give you 1 card of that type from their hand of their choice. If they do not have that type, they show you their hand and give you one card of their choice.",
    "actions": ["Swipe"]
  }
}
