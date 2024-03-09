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
import { initialHandValue } from "../../Constants/cards";

const Game = (props) => {
  const { userName, setUserName } = useUserInfo();
  const { gameState, setGameState, socket, roomCode } = useGameConditions();
  const [selected, setSelected] = useState([]);
  const [selectedHand, setSelectedHand] = useState([]);
  const [selectedHandValues, setSelectedHandValues] =
    useState(initialHandValue);
  const [noEnergy, setNoEnergy] = useState(false);
  const [discardCards, setDiscardCards] = useState([]);
  const [needDiscard, setNeedDiscard] = useState(false);
  const [canBuyEnergy, setCanBuyEnergy] = useState(false);
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
  const maxRefresh = gameState?.users?.maxRefresh || 5;
  console.log("gameState", gameState);
  const startGame = () => {
    socket.emit("gameAction", { actionType: "startGame" }, roomCode, userName);
    socket.emit("gameAction", { actionType: "startTurn" }, roomCode, userName);
  };
  const drawCard = () => {
    socket.emit("gameAction", { actionType: "drawCard" }, roomCode, userName);
  };
  const endTurn = () => {
    // socket.emit(
    //   "gameAction",
    //   { actionType: "discardCards", actionData: discardCards },
    //   roomCode,
    //   userName
    // );
    //instead of emiting discard cards, just send the array as part of the end turn, backend will handle
    socket.emit(
      "gameAction",
      { actionType: "endTurn", actionData: { discardCards } },
      roomCode,
      userName
    );
    socket.emit("gameAction", { actionType: "startTurn" }, roomCode, userName);
  };
  const cardClick = (clickedCard, hand, discard) => {
    if (hand && !discard) {
      if (selectedHand.includes(clickedCard)) {
        // If selected, remove from selected cards
        setSelectedHand(
          selectedHand.filter((card) => card.name !== clickedCard.name)
        );
      } else {
        // If not selected, add to selected cards
        setSelectedHand([...selectedHand, clickedCard]);
      }
    } else if (discard) {
      if (discardCards.includes(clickedCard)) {
        // If selected, remove from selected cards
        setDiscardCards(
          discardCards.filter((card) => card.name !== clickedCard.name)
        );
      } else {
        // If not selected, add to selected cards
        setDiscardCards([...discardCards, clickedCard]);
      }
    }
    // Check if card is already selected
    if (selected.includes(clickedCard)) {
      // If selected, remove from selected cards
      setSelected(selected.filter((card) => card.name !== clickedCard.name));
    } else {
      // If not selected, add to selected cards
      setSelected([...selected, clickedCard]);
    }
  };
  const enableCard = (card) => {
    let enabled = true;
    let cost = card.cost;
    for (const key in cost) {
      if (cost[key] > selectedHandValues[key]) {
        enabled = false;
      }
    }
    return enabled;
  };
  const buyEnergy = () => {
    //remove 2 candy from hand and add 1 energy
    //backend needs to handle this so they know about updated hand state
    socket.emit(
      "gameAction",
      { actionType: "buyEnergy", actionData: { selectedHand } },
      roomCode,
      userName
    );
  };
  useEffect(() => {
    let sweets = 0;
    for (let i = 0; i < selectedHand.length; i++) {
      if (selectedHand[i].status === "ingredientSweet") {
        sweets++;
      }
    }
    if (sweets >= 2) {
      setCanBuyEnergy(true);
    }
  }, [selectedHand]);
  useEffect(() => {
    setSelectedHandValues(initialHandValue);
    if (selectedHand.length > 0) {
      selectedHand.forEach((card) => {
        let valueObject = card.value;
        Object.keys(valueObject).forEach((key) => {
          setSelectedHandValues((prevValues) => ({
            ...prevValues,
            [key]: (prevValues[key] || 0) + valueObject[key],
          }));
        });
      });
    }
  }, [selectedHand]);

  useEffect(() => {
    if (user?.energy === 0) {
      //disable everything except spending 2 candy to buy another energy or ending turn
      setNoEnergy(true);
    } else {
      setNoEnergy(false);
    }
  }, [user?.energy]);
  useEffect(() => {
    //TODO: need to add some handling to allow sweets to buy energy
    if (maxRefresh < user?.hand?.length && noEnergy) {
      setNeedDiscard(true);
    } else {
      setNeedDiscard(false);
    }
  }, [user?.hand, maxRefresh, noEnergy]);
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
        endTurn={needDiscard ? endTurn : () => {}}
        currentPlayer={currentPlayer}
        noEnergy={noEnergy}
      />
      <div className="gameContainer">
        {/* <div className="cardStackContainer">
          <CardStack ingredient={true}></CardStack>
          <CardStack ingredient={false}></CardStack>
        </div> */}
        <div className="playerHandContainer">
          <div className="playerHandTitle">{userName}'s Hand</div>
          <PlayerHand
            selectedCards={selectedHand}
            cardClick={cardClick}
            disabled={!currentPlayer}
            noEnergy={noEnergy}
            needDiscard={needDiscard}
            discardCards={discardCards}
          />
        </div>
        <div className="playerHandContainer">
          <div className="playerHandTitle">{userName}'s Board</div>
          <PlayerBoard
            user={user}
            selectedCards={selectedHand}
            cardClick={cardClick}
            disabled={!currentPlayer}
            noEnergy={noEnergy}
          />
        </div>
        <Grid
          gameState={gameState}
          selectedCards={selected}
          //TODO: add logic if card is less than selected value and can be afforded
          //do something with the CSS and make clickable
          selectedCardValues={selectedHandValues}
          cardClick={cardClick}
          disabled={!currentPlayer}
          enableCard={enableCard}
          noEnergy={noEnergy}
        />
        {canBuyEnergy ? <button onClick={buyEnergy}>Buy Energy</button> : ""}
        {needDiscard && (
          <div className="discardModal">
            <div className="discardModalText">{`Please select cards in hand to discard down to max refresh -- ${maxRefresh} or use two sweet to buy an energy`}</div>
            {user?.hand?.length - discardCards.length <= maxRefresh ? (
              <button onClick={endTurn}>End Turn</button>
            ) : (
              ""
            )}
          </div>
        )}
        <div className="playerHandContainer">
          <div className="playerHandTitle">{opponent?.name}'s Board</div>
          <PlayerBoard user={opponent} cardClick={() => {}} />
        </div>
      </div>
      {/* TODO: add message container */}
      {/* <div className="messageContainer">
        <Messages user={userName}></Messages>
      </div> */}
    </div>
  );
};

export default Game;
