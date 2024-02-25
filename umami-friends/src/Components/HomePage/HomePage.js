import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Game from "../Game/Game";
import useUserInfo from "../../Hooks/useUserInfo";
import useGameConditions from "../../Hooks/useGameConditions";
import { useNavigate } from "react-router";
import "./HomePage.css";

// const socket = io('http://localhost:8080');

const generateRandomRoom = () => {
  //uppercase letters and numbers so make sure to force into uppercase when joining same room
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomRoomCode = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomRoomCode += characters.charAt(randomIndex);
  }

  return randomRoomCode;
};

function HomePage() {
  const navigate = useNavigate();
  const { userName, setUserName } = useUserInfo();
  const { roomCode, setRoomCode, gameState, socket } = useGameConditions();
  const [userInput, setUserInput] = useState("");
  const [roomInput, setRoomInput] = useState("");

  socket?.on("joinedRoom", (user, room) => {
    navigate("/game");
  });
  const sendUser = () => {
    console.log(`Setting user: ${userInput}`);
    setUserName(userInput);
    // Clear the message input field
    setUserInput("");
  };
  const enterNewRoom = () => {
    const newRoomCode = generateRandomRoom();
    socket.emit("joinRoom", newRoomCode, userName);
    setRoomCode(newRoomCode);
    // setRoomInput('')
  };
  const enterExistingRoom = () => {
    if (roomInput != "") {
      setRoomInput(roomInput.toUpperCase());
    }
    socket?.emit("joinRoom", roomInput, userName);
    setRoomCode(roomInput);
    // setRoomInput('')
  };

  //TODO: Add slice of state for room code and another input box. Second button for start new?
  return (
    <div className="homeBackground">
      <img
        className="umamiLogo"
        alt="umami-logo"
        src={require(`../../Pictures/logo.jpg`)}
      />
      <div className="homePage">
        {userName ? <div className="userName">User: {userName}</div> : <></>}
        {!userName ? (
          <div className="userInput">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => (e.key == "Enter" ? sendUser() : null)}
            />
            <button onClick={sendUser}>Set User Name</button>
          </div>
        ) : null}
        {userName && (
          <div className="roomInput">
            <input
              type="text"
              value={roomInput.toUpperCase()}
              maxLength={5}
              onChange={(e) => setRoomInput(e.target.value)}
              onKeyDown={(e) => (e.key == "Enter" ? enterExistingRoom() : null)}
            />
            <button
              disabled={roomInput.length !== 5}
              onClick={enterExistingRoom}
            >
              Enter Existing Room
            </button>
            <div className="enterNewRoom">
              <button
                disabled={!userName}
                onClick={enterNewRoom}
                className="enterRoomButton"
              >
                Create New Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
