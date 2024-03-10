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
  //selected = grid cards selected
  const [selected, setSelected] = useState({});
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
  const userRole = gameState?.users[userIndex]?.role;
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
  const buyCard = () => {
    socket.emit(
      "gameAction",
      { actionType: "buyCard", actionData: { selected, selectedHand } },
      roomCode,
      userName
    );
  };
  const cardClick = (clickedCard, hand = false, discard = false) => {
    if (hand && !discard) {
      if (selectedHand?.includes(clickedCard)) {
        // If selected, remove from selected cards
        setSelectedHand(
          selectedHand.filter((card) => card.name !== clickedCard.name)
        );
      } else {
        // If not selected, add to selected cards
        setSelectedHand([...selectedHand, clickedCard]);
      }
    } else if (discard) {
      if (discardCards?.includes(clickedCard)) {
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
    else if (selected?.name === clickedCard.name) {
      // If selected, remove from selected cards
      setSelected({});
      //also reset the selected ingredients
      setSelectedHand([]);
    } else {
      // If not selected, add to selected cards
      setSelected(clickedCard);
      setSelectedHand([]);
    }
  };
  //TODO: change so that you select a card to buy first then have to select the ingredients required to buy
  const enableBuy = (card) => {
    //now cards can always be bought unless one already selected?
    //have a buy button appear when the ingredients selected exactly equal cost
    //if can buy then don't let them add more ingredients
    let enabled = true;
    let cost = card.cost;
    for (const key in cost) {
      if (cost[key] > selectedHandValues[key]) {
        enabled = false;
      }
    }
    return enabled;
  };
  //TODO add logic to only count up to the exact cost of card.
  const enableIngredient = (card) => {
    let enabled = false;
    //get cost of the selected grid card
    let cost = selected.cost;
    //cost is an object with keys of the ingredient and values of the amount required
    for (const key in cost) {
      //if the cost is still higher than selected values and the card we want to enable has that value then enable it to select
      if (cost[key] >= selectedHandValues[key] && card.value[key] > 0) {
        return true;
      }
    }
    return false;
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
    if ((sweets = 2)) {
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
      {userRole === "" && <PlayerChoice user={user} />}
      <Header
        userName={userName}
        roomCode={gameState.roomCode}
        role={userRole}
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
            enableIngredient={enableIngredient}
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
            enableIngredient={enableIngredient}
          />
        </div>
        <Grid
          gameState={gameState}
          selectedCard={selected}
          //TODO: add logic if card is less than selected value and can be afforded
          //do something with the CSS and make clickable
          selectedCardValues={selectedHandValues}
          cardClick={cardClick}
          disabled={!currentPlayer}
          enableBuy={enableBuy}
          noEnergy={noEnergy}
          buyCard={buyCard}
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
