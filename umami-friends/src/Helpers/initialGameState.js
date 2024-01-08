export const initialGame = {
    roomCode: '',
    //either 2 or 4 users for valid game
    users: [],
    //10 rare recipes
    rareRecipes: [],
    commonRecipes: {
        healthySnack: 6,
        spicyRamen: 5,
        fancyBurger: 5,
        tacoParty: 4,
        niceCream: 3,
        gardenSalad: 3,
        hotPot: 3,
        megaBurger: 3,
        bigBurrito: 2,
        twiceCream: 2
    },
    player1Hand: [],
    player2Hand: [],
    player1Board: {
        //need to have candy items be objects to track what turn they were put down
        //candies can only be played the turn after getting
        candy: [],
        ingredients: []
    },
    player2Board: {
        candy: [],
        ingredients: []
    },
    player1Energy: 1,
    player2Energy: 1,
    playerTurn: 1,
    turnCount: 0,
    player1Points: 0,
    player2Points: 0,
    win: false
}
