import React from "react";
import useUserInfo from "../../Hooks/useUserInfo";
import useGameConditions from "../../Hooks/useGameConditions";
import "./PlayerHand.css";

export const PlayerHand = props => {
  const { userName } = useUserInfo();
  const { gameState } = useGameConditions();
  const user = gameState?.users.find(user => user.name === userName);
  const playerHand = user?.hand;
  const noEnergy = props?.noEnergy || false;
  const needDiscard = props?.needDiscard || false;
  return (
    <div>
      {playerHand?.map((item, index) => {
        const enable = props?.enableIngredient(item);
        return (
          <div
            key={index}
            className={`player-card-body ${
              (props.selectedCards.includes(item) ||
                props.discardCards.includes(item)) &&
              "selected"
            }`}
            onClick={() =>
              props.disabled ||
              (noEnergy && !needDiscard) ||
              item.status === "ingredientSweet" ||
              !enable
                ? ""
                : props.cardClick(item, true, needDiscard)
            }
          >
            <img
              className="playerRecipeCard"
              alt={`${item.pictureName}`}
              src={require(`../../Pictures/${item.pictureName}.png`)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PlayerHand;
