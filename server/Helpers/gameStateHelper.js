import { initialGame } from '../Constants/initialGameState.js'

let activeGames = {}

// Function to create a deep copy of an object
const deepCopy = obj => JSON.parse(JSON.stringify(obj))

// Function to create a new instance of the initial game state
const createInitialGameState = () => {
    return deepCopy(initialGame)
}

export const getGameState = roomCode => {
    if (activeGames[roomCode] === undefined) {
        let gameState = createInitialGameState()

        gameState.roomCode = roomCode
        activeGames[roomCode] = gameState
    }

    return activeGames[roomCode]
}

export const updateGameState = (roomCode, gameState) => {
    activeGames[roomCode] = gameState
}

export const deleteGameState = roomCode => {
    if (activeGames[roomCode]) {
        delete activeGames[roomCode]
    }
}
