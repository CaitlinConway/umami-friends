import React from "react";
import useUserInfo from "../../Hooks/useUserInfo";
import useGameConditions from "../../Hooks/useGameConditions";
export const PlayerBoard = (props) => {
  const { userName } = useUserInfo();
  const { gameState } = useGameConditions();
  // const user = gameState?.users.find((user) => (user.name = userName));
  const user = props?.user;
  const playerBoard = user?.board;
  const noEnergy = props?.noEnergy;

  return (
    <div>
      {playerBoard?.candy?.map((item, index) => (
        <div
          className={`player-card-body ${
            props?.selectedCards?.includes(item) && "selected"
          }`}
          onClick={() => (props.disabled ? "" : props.cardClick(item, true))}
        >
          <img
            className="playerRecipeCard"
            alt={`${item.name}`}
            src={require(`../../Pictures/${item.pictureName}.png`)}
          />
        </div>
      ))}
      {playerBoard?.ingredients?.map((item, index) => (
        <div
          className={`player-card-body ${
            props?.selectedCards?.includes(item) && "selected"
          }`}
          onClick={() =>
            props.disabled || noEnergy ? "" : props.cardClick(item, true)
          }
        >
          <img
            className="playerRecipeCard"
            alt={`${item.name}`}
            src={require(`../../Pictures/${item.pictureName}.png`)}
          />
        </div>
      ))}
    </div>
  );
};

export default PlayerBoard;
