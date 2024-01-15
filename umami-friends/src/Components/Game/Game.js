import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import useUserInfo from "../../Hooks/useUserInfo";
import { Grid } from "../Grid/Grid";
import { Header } from "../Header/Header";
import { Messages } from "../Messages/Messages";
import { PlayerChoice } from "../PlayerChoice/PlayerChoice";
import { default as useGameConditions } from "../../Hooks/useGameConditions";
import "./Game.css";

const Game = (props) => {
  const { userName, setUserName } = useUserInfo();
  const { gameState, setGameState, socket, roomCode } = useGameConditions();
  let user = gameState?.users?.find((user) => user.name === userName);
  const role = user?.role;
  //TODO: update when expand to 4 players, will just work for two
  const opponent = gameState?.users?.find((user) => user.name != userName);

  //TODO: actually fix this logic
  const startGame = () => {
    socket.emit("gameAction", { actionType: "startGame" }, roomCode, userName);
  };

  return (
    <div className="gameBackground">
      <div className="gameContainer">
        {role === "" && <PlayerChoice user={user} />}
        <Header
          userName={userName}
          roomCode={gameState.roomCode}
          role={role}
          opponent={opponent}
        />
        <Grid gameState={gameState} startGame={startGame} />
      </div>
      <div className="messageContainer">
        <Messages user={userName}></Messages>
      </div>
    </div>
  );
};

export default Game;
