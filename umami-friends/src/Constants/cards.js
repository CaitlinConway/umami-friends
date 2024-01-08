
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
            greenCircle: 3
        },
        energy: 1,
        description: "Place 2 ingredients from your hand onto your board. Refresh. All other players draw +1 card",
        actions: ["energy1", "placeIngredients2", "otherPlayersDraw"]
    }
]
