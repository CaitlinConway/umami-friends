import React, { useState, useEffect } from "react";
import { default as useGameConditions } from "../../Hooks/useGameConditions";
import useUserInfo from "../../Hooks/useUserInfo";
export const Messages = (props) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { gameState, setGameState, socket, roomCode } = useGameConditions();
  const { userName } = useUserInfo();
  const sendMessage = () => {
    console.log(`Sending message: ${messageInput}`);
    socket.emit("message", messageInput, roomCode, userName);
    setMessageInput("");
  };
  socket?.on("messaged", (message, userName) => {
    console.log("messageRecieved");
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: userName, text: message },
    ]);
  });
  return (
    <div className="message-container">
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => (e.key == "Enter" ? sendMessage() : null)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
