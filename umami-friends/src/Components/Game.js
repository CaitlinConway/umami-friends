import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3030');

const Game = (props) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (message) => {
      setMessages( (prevMessages) =>message.user !== socket.id ?[...prevMessages, message]: [...prevMessages]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    console.log(`Sending message: ${messageInput}`);

    // Emit a message to the server
    const message = {user: socket.id, text: messageInput}
    socket.emit('message', message);
    // // Update the local state with the sent message
    setMessages((prevMessages) => [...prevMessages, { user: socket.id, text: messageInput }]);

    // Clear the message input field
    setMessageInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) =>  (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
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
      </div>
    </div>
  );
};

export default Game;
