import React, { useState, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { initialGame } from "../Constants/initialGameState";
const gameContext = createContext();

export function GameConditionsProvider(props) {
    let socket;
    const [roomCode, setRoomCode] = useState("");
    const [gameState, setGameState] = useState(initialGame);

    if (!socket) {
        socket = io("http://localhost:8080");
    }

    socket.on("updateGameState", newState => {
        console.log("updating game state: ", newState);
        setGameState(newState);
    });

    const { Provider } = gameContext;
    const providerValue = {
        gameState,
        roomCode,
        setRoomCode,
        socket,
    };

    return <Provider value={providerValue}>{props.children}</Provider>;
}

export default function useGameConditions() {
    return useContext(gameContext);
}
