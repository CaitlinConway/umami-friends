import React, { useState, useEffect } from "react";
import { default as useGameConditions } from "../../Hooks/useGameConditions";
import useUserInfo from "../../Hooks/useUserInfo";
import "./Messages.css";

export const Messages = props => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { gameState, setGameState, roomCode, socket } = useGameConditions();
  const { userName } = useUserInfo();
  const sendMessage = () => {
    console.log(`Sending message: ${messageInput}`);
    socket.emit("message", messageInput, roomCode, userName);
    setMessages(prevMessages => [
      ...prevMessages,
      { user: userName, text: messageInput },
    ]);
    setMessageInput("");
  };
  socket?.on("message", (message, userName) => {
    console.log("messageRecieved");
    setMessages(prevMessages => [
      ...prevMessages,
      { user: userName, text: message },
    ]);
  });
  return (
    <div className="message-container">
      {messages.map((msg, index) => (
        <div key={index}>
          <strong
            className={
              msg.user === userName ? "userMessage" : "opponentMessage"
            }
          >
            {msg.user}:
          </strong>{" "}
          {msg.text}
        </div>
      ))}
      <div className="messageInput">
        <input
          type="text"
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
          onKeyDown={e => (e.key == "Enter" ? sendMessage() : null)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
