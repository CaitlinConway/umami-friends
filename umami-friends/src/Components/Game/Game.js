import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useUserInfo from '../../Hooks/useUserInfo'
import { Grid } from '../Grid/Grid';
import { Header } from '../Header/Header';
import { default as useGameConditions } from '../../Hooks/useGameConditions'
import './Game.css'

const socket = io('http://localhost:3030');

const Game = (props) => {
  const { userName, setUserName } = useUserInfo()
  const { gameState, setGameState } = useGameConditions()
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (message) => {
      setMessages((prevMessages) => message.user !== socket.id ? [...prevMessages, message] : [...prevMessages]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    console.log(`Sending message: ${messageInput}`);

    // Emit a message to the server
    const message = { user: socket.id, text: messageInput }
    socket.emit('message', message);
    // // Update the local state with the sent message
    setMessages((prevMessages) => [...prevMessages, { user: socket.id, text: messageInput }]);

    // Clear the message input field
    setMessageInput('');
  };

  //TODO: actually fix this logic
  const startGame = () => {
    socket.emit('startGame', gameState.roomCode)
    setGameState((prevState) => {
      return { ...prevState, playerTurn: 1 };
    });
    socket.emit('updateGameState', gameState)
  }

  return (
    <div className='gameContainer'>
      <Header userName={userName} roomCode={gameState.roomCode} />
      <Grid gameState={gameState} startGame={startGame} />
      {/* <div className='message-container'>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{userName}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => e.key == 'Enter' ? sendMessage() : null}
        />
        <button onClick={sendMessage}>Send</button>
      </div> */}
    </div>
  );
};

export default Game;
