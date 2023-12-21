import React, {useState, createContext, useContext} from 'react'

const context = createContext()

export function ContextProvider(props){
    const [win, setWin] = useState(false)
    const {Provider} = context;
    const providerValue = {win, setWin}
    return <Provider value={providerValue}>{props.children}</Provider>
}

export default function useContextProvider(){
    return useContext(context)
}
