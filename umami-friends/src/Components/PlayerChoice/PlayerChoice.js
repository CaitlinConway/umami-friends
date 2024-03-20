import React from "react";
import { playerRoles } from "../../Constants/roles";
import { Tooltip } from "react-tooltip";
import "./PlayerChoice.css";
import { Socket } from "socket.io-client";
import useGameConditions from "../../Hooks/useGameConditions";
import useUserInfo from "../../Hooks/useUserInfo";

export const PlayerChoice = (props) => {
  const { userName } = useUserInfo();
  const { socket, roomCode } = useGameConditions();
  const chooseCharacter = (roleName) => {
    socket?.emit(
      "gameAction",
      { actionType: "setRole", role: roleName },
      roomCode,
      userName
    );
  };

  return (
    <div className="playerChoiceModal">
      <div className="characterChoiceText">Choose Your Character</div>
      <div className="playerChoiceContainer">
        {Object.keys(playerRoles)?.map((roleName, index) => {
          const img = require(`../../Pictures/${roleName}Card.png`);
          return (
            <div
              onClick={(e) => chooseCharacter(roleName)}
              key={roleName}
              className="playerChoiceCard"
            >
              <img
                src={img}
                alt={roleName}
                data-tooltip-id={`playerTooltip${index}`}
              />
              <Tooltip
                className="tooltip-playerChoice"
                id={`playerTooltip${index}`}
                place="bottom"
                data-tooltip-position-strategy="fixed"
                border={"none"}
                opacity={1}
              >
                <img className="hoveredImage" alt={`${roleName}`} src={img} />
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};
