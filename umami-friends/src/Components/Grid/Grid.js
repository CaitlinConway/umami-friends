import React from "react";
import { default as useGameConditions } from "../../Hooks/useGameConditions";
import "./Grid.css";
import { Tooltip } from "react-tooltip";
import basicRecipeObjects from "../../Constants/basicRecipes.json";

export const Grid = (props) => {
  const { gameState } = useGameConditions();
  const { basicRecipes, rareRecipes } = gameState;
  return (
    <div className="grid-container">
      {basicRecipes.map((recipe, index) => {
        const img = require(`../../Pictures/${recipe.pictureName}.png`);
        const pileCount = gameState?.basicRecipes[index]?.pileCount;
        const enabled = props.enableCard(recipe);
        const selected = props.selectedCards.includes(recipe);
        return (
          <div
            key={index}
            className={`grid-item ${selected && enabled && "selected"} ${
              recipe && enabled && !selected && "enabled"
            }`}
            onClick={() =>
              props.disabled
                ? ""
                : recipe && enabled
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
        const enabled = props.enableCard(recipe);
        const selected = props.selectedCards.includes(recipe);

        return (
          <div
            key={index}
            className={`grid-item ${selected && enabled && "selected"} ${
              recipe && enabled && !selected && "enabled"
            }`}
            onClick={() =>
              props.disabled
                ? ""
                : recipe && enabled
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
