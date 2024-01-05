import React, { useState, createContext, useContext } from 'react'

const userInfoContext = createContext()
export function UserInfoProvider(props) {

    //user info
    const [userName, setUserName] = useState("")

    const { Provider } = userInfoContext;
    const providerValue = { userName, setUserName }
    return <Provider value={providerValue}>{props.children}</Provider>
}

export default function useUserInfo() {
    return useContext(userInfoContext)
}
