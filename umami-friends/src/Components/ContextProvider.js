import React from 'react'
import { GameConditionsProvider } from '../Hooks/useGameConditions'
import { UserInfoProvider } from '../Hooks/useUserInfo'

export function ContextProvider(props) {
    return (
        <UserInfoProvider>
            <GameConditionsProvider>{props.children}</GameConditionsProvider>
        </UserInfoProvider>
    )
}
