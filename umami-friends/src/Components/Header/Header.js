import React from "react";
import "./Header.css";
import useGameConditions from "../../Hooks/useGameConditions";
import { playerRoles } from "../../Constants/roles";

export const Header = (props) => {
  const { gameState, socket, roomCode } = useGameConditions();
  const opponentsReady =
    gameState?.users?.length === 2 || gameState?.users?.length === 4;

  return (
    <div className="header">
      <div className="header-middle">
        <div className="header-userName">User: {props.userName}</div>
        <div className="header-roomCode">Room Code: {props.roomCode}</div>
      </div>
      <div className="roleIcon">
        {props.role && (
          <img
            className="roleIconImage"
            src={require(`../../Pictures/${props.role}.png`)}
            alt="Example"
          />
        )}
      </div>
      {!opponentsReady && (
        <div className="waiting">Waiting for opponents...</div>
      )}
      {opponentsReady && (
        <div className="opponentHeader">
          {" "}
          Opponent: {`${props?.opponent?.name}`}
          <div className="roleIcon">
            {props?.opponent?.role && (
              <img
                className="roleIconImage"
                src={require(`../../Pictures/${props?.opponent?.role}.png`)}
                alt="Example"
              />
            )}
          </div>
        </div>
      )}
      <div className="header-title-container">
        <div className="header-title">Umami Friends</div>
        <div className="header-subtitle">A game of culinary creation</div>
      </div>
      <div className="header-right">
        {gameState.playerTurn === 0 && (
          <button
            className="start-button"
            disabled={!opponentsReady}
            onClick={props.startGame}
          >
            Start Game
          </button>
        )}
        {props.currentPlayer && (
          <button className="drawcard-button" onClick={props.drawCard}>
            Draw Card
          </button>
        )}
        {gameState.playerTurn !== 0 && !props.currentPlayer && (
          <div className="waiting">{`${props?.opponent?.name}'s Turn`}</div>
        )}
        {props.currentPlayer && (
          <button className="start-button" onClick={props.endTurn}>
            End Turn
          </button>
        )}
        {
          props.currentPlayer && (
            <button className="user-action-button"
              onClick={() => playerRoles[props.role]?.userAction(socket, roomCode)}
            > 
              Take User Action
            </button>
          )
        }
      </div>
    </div>
  );
};
