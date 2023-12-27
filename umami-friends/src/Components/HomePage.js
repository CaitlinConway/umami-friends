import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Game from "./Game";
import useUserInfo from '../Hooks/useUserInfo'

const socket = io('http://localhost:3030');


function HomePage() {
    //make this hook
    const { userName, setUserName } = useUserInfo();
    const [userInput, setUserInput] = useState('');

    const sendMessage = () => {
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

    return (
        <div>
            Umami Friends
            <div className='userInput'>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' ? sendMessage() : null}
                />
                <button onClick={sendMessage}>Set User Name</button>
            </div>
        </div>
    )
}

export default HomePage;
