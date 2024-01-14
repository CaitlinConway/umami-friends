import React from "react";
import "./Header.css";
import useGameConditions from "../../Hooks/useGameConditions";

export const Header = (props) => {
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
      <div className="header-title-container">
        <div className="header-title">Umami Friends</div>
        <div className="header-subtitle">A game of culinary creation</div>
      </div>
      <div className="header-right">
        <button className="start-button" onClick={props.startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};
