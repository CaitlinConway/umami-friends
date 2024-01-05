import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Game from "./Game";
import useUserInfo from '../Hooks/useUserInfo'
import useGameConditions from '../Hooks/useGameConditions'

// const socket = io('http://localhost:3030');

const generateRandomRoom = () => {
    //uppercase letters and numbers so make sure to force into uppercase when joining same room
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomRoomCode = '';

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomRoomCode += characters.charAt(randomIndex);
    }

    return randomRoomCode;
};

function HomePage() {
    //make this hook
    const { userName, setUserName } = useUserInfo();
    const { roomCode, setRoomCode, gameState, socket } = useGameConditions();
    const [userInput, setUserInput] = useState('');
    const [roomInput, setRoomInput] = useState('')

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
    const enterNewRoom = () => {
        const newRoomCode = generateRandomRoom()
        console.log(`Entering new`)
        socket.emit('joinNewRoom', newRoomCode)
        setRoomCode(newRoomCode)
        setRoomInput('')
    }
    const enterExistingRoom = () => {
        if (roomInput != "") {
            roomInput = roomInput.toUpperCase()
        }
        console.log(`Entering room: ${roomInput}`)
        socket.emit('joinRoom', roomInput)
        setRoomCode(roomInput)
        setRoomInput('')
    }

    //TODO: Add slice of state for room code and another input box. Second button for start new?
    return (
        <div>
            Umami Friends
            {userName ? <div className='userName'>User: {userName}</div> : <></>}
            {!userName ? (<div className='userInput'>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' ? sendUser() : null}
                />
                <button onClick={sendUser}>Set User Name</button>
            </div>) : null}
            <div className='roomInput'>
                <button onClick={enterNewRoom}>Enter new room</button>
                <input
                    type="text"
                    value={roomInput}
                    onChange={(e) => setRoomCode(e.target.value)}
                    onKeyDown={(e) => e.key == 'Enter' ? enterExistingRoom() : null}
                />
                <button onClick={enterExistingRoom}>Enter existing room</button>
            </div>
        </div>
    )
}

export default HomePage;
