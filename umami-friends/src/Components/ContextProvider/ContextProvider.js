import React from 'react'
import { GameConditionsProvider } from '../../Hooks/useGameConditions'
import { UserInfoProvider } from '../../Hooks/useUserInfo'


export default function ContextProvider(props) {
    return (
        <UserInfoProvider>
            <GameConditionsProvider>
                {props.children}
            </GameConditionsProvider>
        </UserInfoProvider>
    )
}
