import React, {useState, createContext, useContext} from 'react'

const gameContext = createContext()
export function GameConditionsProvider(props){
    //game conditions
    const [win, setWin] = useState(false)


    const {Provider} = gameContext;
    const providerValue = {win, setWin}
    return <Provider value={providerValue}>{props.children}</Provider>
}

export default function useGameConditions(){
    return useContext(gameContext)
}
