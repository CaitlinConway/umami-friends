import React from "react";
import { playerRoles } from "../../Constants/cards";
import { Tooltip } from "react-tooltip";
import "./PlayerChoice.css";
import { Socket } from "socket.io-client";
import useGameConditions from "../../Hooks/useGameConditions";
import useUserInfo from "../../Hooks/useUserInfo";

export const PlayerChoice = (props) => {
  const { userName } = useUserInfo();
  const { socket, roomCode } = useGameConditions();
  const chooseCharacter = (role) => {
    console.log("chooseCharacter", role);
    socket?.emit(
      "gameAction",
      { actionType: "setRole", role: role },
      roomCode,
      userName
    );
  };

  return (
    <div className="playerChoiceModal">
      <div className="characterChoiceText">Choose Your Character</div>
      <div className="playerChoiceContainer">
        {playerRoles?.map((role, index) => {
          const img = require(`../../Pictures/${role.name}Card.png`);
          return (
            <div
              onClick={(e) => chooseCharacter(role.name)}
              key={index}
              className="playerChoiceCard"
            >
              <img
                src={img}
                alt={role.name}
                data-tooltip-id={`playerTooltip${index}`}
              />
              <Tooltip
                className="tooltip"
                id={`playerTooltip${index}`}
                place="bottom"
                data-tooltip-position-strategy="fixed"
                border={"none"}
                opacity={1}
              >
                <img className="hoveredImage" alt={`${role.name}`} src={img} />
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};
