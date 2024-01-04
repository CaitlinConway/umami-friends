import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Game from "./Game";
import useUserInfo from '../Hooks/useUserInfo'

const socket = io('http://localhost:3030');


function HomePage() {
    //make this hook
    const { userName, setUserName, setRoomCode, roomCode } = useUserInfo();
    const [userInput, setUserInput] = useState('');

    const sendUser = () => {
        console.log(`Setting user: ${userInput}`);

        // Emit a message to the server
        const user = { userId: socket.id, userName: userInput }
        //TODO add handling on server for new user
        socket.emit('user', user);
        // // Update the local state with the sent message
        setUserName(userInput);

        // Clear the message input field
        setUserInput('');
    };

    //TODO: Add slice of state for room code and another input box. Second button for start new?
    return (
        <div>
            Umami Friends
            {userName ? <div className='userName'>User: {userName}</div> : <></>}
            <div className='userInput'>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' ? sendUser() : null}
                />
                <button onClick={sendUser}>Set User Name</button>
                <button onClick={enterNewRoom}>Enter new room</button>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setRoomCode(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' ? enterExistingRoom() : null}
                />
                <button onClick={enterExistingRoom}>Enter existing room</button>
            </div>
        </div>
    )
}

export default HomePage;
