import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import useUserInfo from "../../Hooks/useUserInfo";
import { Grid } from "../Grid/Grid";
import { Header } from "../Header/Header";
import { Messages } from "../Messages/Messages";
import { PlayerChoice } from "../PlayerChoice/PlayerChoice";
import { CardStack } from "../CardStack/CardStack";
import { default as useGameConditions } from "../../Hooks/useGameConditions";
import "./Game.css";
import PlayerHand from "../PlayerHand/PlayerHand";
import PlayerBoard from "../PlayerBoard/PlayerBoard";

const Game = (props) => {
  const { userName, setUserName } = useUserInfo();
  const { gameState, setGameState, socket, roomCode } = useGameConditions();
  let user = gameState?.users?.find((user) => user.name === userName);
  const userIndex = gameState?.users?.findIndex(
    (user) => user.name === userName
  );
  const playerNumber = userIndex + 1;
  //boolean to check if user is also current player
  const currentPlayer = gameState?.playerTurn === playerNumber;
  const role = user?.role;
  //TODO: update when expand to 4 players, will just work for two
  const opponent = gameState?.users?.find((user) => user.name != userName);
  console.log("gameState", gameState);
  const startGame = () => {
    socket.emit("gameAction", { actionType: "startGame" }, roomCode, userName);
    socket.emit("gameAction", { actionType: "startTurn" }, roomCode, userName);
  };
  const drawCard = () => {
    socket.emit("gameAction", { actionType: "drawCard" }, roomCode, userName);
  };
  const endTurn = () => {
    socket.emit("gameAction", { actionType: "endTurn" }, roomCode, userName);
    socket.emit("gameAction", { actionType: "startTurn" }, roomCode, userName);
  };

  return (
    <div className="gameBackground">
      {role === "" && <PlayerChoice user={user} />}
      <Header
        userName={userName}
        roomCode={gameState.roomCode}
        role={role}
        opponent={opponent}
        startGame={startGame}
        drawCard={drawCard}
        endTurn={endTurn}
        currentPlayer={currentPlayer}
      />
      <div className="gameContainer">
        {/* <div className="cardStackContainer">
          <CardStack ingredient={true}></CardStack>
          <CardStack ingredient={false}></CardStack>
        </div> */}
        <div className="playerHandContainer">
          <div className="playerHandTitle">{userName}'s Hand</div>
          <PlayerHand />
        </div>
        <div className="playerHandContainer">
          <div className="playerHandTitle">{userName}'s Board</div>
          <PlayerBoard />
        </div>
        <Grid gameState={gameState} />
      </div>

      {/* <div className="messageContainer">
        <Messages user={userName}></Messages>
      </div> */}
    </div>
  );
};

export default Game;
