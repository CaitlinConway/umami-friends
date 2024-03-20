import React from "react";
import { default as useGameConditions } from "../../Hooks/useGameConditions";
import "./Grid.css";
import { Tooltip } from "react-tooltip";

export const Grid = props => {
  const { gameState } = useGameConditions();
  const { basicRecipes, rareRecipes } = gameState;
  const noEnergy = props?.noEnergy || false;
  return (
    <div className="grid-container">
      {basicRecipes.map((recipe, index) => {
        const img = require(`../../Pictures/${recipe.pictureName}.png`);
        const pileCount = gameState?.basicRecipes[index]?.pileCount;
        const selected = props.selectedCard?.name === recipe?.name;
        return (
          <div
            key={index}
            className={`grid-item ${selected && "enabled"} `}
            onClick={() =>
              props.disabled || noEnergy
                ? ""
                : recipe
                  ? props.cardClick(recipe)
                  : ""
            }
          >
            <img
              data-tooltip-id={`imageTooltip${index}`}
              className="recipeCard"
              alt={`${recipe}`}
              src={img}
            />
            <Tooltip
              className="tooltip"
              id={`imageTooltip${index}`}
              place="bottom"
              data-tooltip-position-strategy="fixed"
              border={"none"}
              opacity={1}
            >
              <img className="hoveredImage" alt={`${recipe}`} src={img} />
              <div className="tooltip-text">{`Pile Count: ${pileCount}`}</div>
            </Tooltip>
          </div>
        );
      })}
      {rareRecipes.map((recipe, index) => {
        const img2 = require(`../../Pictures/${recipe.pictureName}.png`);
        const selected = props.selectedCards?.name === recipe?.name;

        return (
          <div
            key={index}
            className={`grid-item ${selected && "enabled"} `}
            onClick={() =>
              props.disabled || noEnergy
                ? ""
                : recipe
                  ? props.cardClick(recipe)
                  : ""
            }
          >
            <img
              data-tooltip-id={`rareTooltip${index}`}
              className="recipeCard"
              alt={`${recipe}`}
              src={img2}
            />
            <Tooltip
              className="tooltip"
              id={`rareTooltip${index}`}
              place="bottom"
              data-tooltip-position-strategy="fixed"
              border={"none"}
              opacity={1}
            >
              <img className="hoveredImage" alt={`${recipe}`} src={img2} />
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};
