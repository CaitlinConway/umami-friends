import React from "react";
import useUserInfo from "../../Hooks/useUserInfo";
import useGameConditions from "../../Hooks/useGameConditions";
export const PlayerHand = (props) => {
  const { userName } = useUserInfo();
  const { gameState } = useGameConditions();
  const user = gameState?.users.find((user) => (user.name = userName));
  const playerHand = user?.hand;
  return (
    <div>
      {playerHand?.map((item, index) => (
        <div className="player-card-body">
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

export default PlayerHand;
