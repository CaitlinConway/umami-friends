import { initialGame } from "../Constants/initialGameState.js";


let activeGames = [];
export const getGameState = (roomCode) => {
    let gameState = initialGame;
    const activeGameIndex = activeGames.findIndex((game) => game.roomCode === roomCode);
    if (activeGameIndex < 0) {
        gameState.roomCode = roomCode;
    }
    else {
        gameState = activeGames[activeGameIndex];
    }
    return gameState;
}

export const updateGameState = (roomCode, gameState) => {
    const activeGameIndex = activeGames.findIndex((game) => game.roomCode === roomCode);
    if (activeGameIndex < 0) {
        activeGames.push(gameState);
    }
    else {
        activeGames[activeGameIndex] = gameState;
    }
}
export const deleteGameState = (roomCode) => {
    const activeGameIndex = activeGames.findIndex((game) => game.roomCode === roomCode);
    if (activeGameIndex >= 0) {
        activeGames.filter((game) => game.roomCode !== roomCode );
    }
}
