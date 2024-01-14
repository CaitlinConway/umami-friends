import React from "react";
import { playerRoles } from "../../Constants/cards";
import { Tooltip } from "react-tooltip";
import "./PlayerChoice.css";

export const PlayerChoice = (props) => {
  return (
    <div className="playerChoiceModal">
      <div className="characterChoiceText">Choose Your Character</div>
      <div className="playerChoiceContainer">
        {playerRoles?.map((role, index) => {
          const img = require(`../../Pictures/${role.name}Card.png`);
          return (
            <div key={index} className="playerChoiceCard">
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
