import React, { useState, createContext, useContext } from 'react'
import { io } from 'socket.io-client'
import { initialGame } from '../Constants/initialGameState'
const gameContext = createContext()

export function GameConditionsProvider(props) {
    //game conditions
    const [roomCode, setRoomCode] = useState('')
    const [gameState, setGameState] = useState(initialGame)
    const socket = io('http://localhost:3030');
    socket.on('updateGameState', newState => {
        setGameState(newState)
    })
    const { Provider } = gameContext;
    const providerValue = { gameState, roomCode, setRoomCode, socket }
    return <Provider value={providerValue}>{props.children}</Provider>
}

export default function useGameConditions() {
    return useContext(gameContext)
}
