const getOpponent = (userIndex) => (userIndex === 0 ? 1 : 0);

export function cardActionHelper(type, { cardNumber, player }, mainData) {
  const { actionData, userIndex, gameState } = mainData;
  // const gameState = getGameState(roomCode);
  // const userIndex = gameState.users.findIndex((user) => user.name === userName);
  // const userRole = gameState.users[userIndex].role;
  // const currentPlayer = gameState.users[gameState.playerTurn - 1];
  switch (type) {
    case "drawCard":
      return {
        type: "moveCard",
        data: {
          zone: {
            to: {
              user: player === "others" ? getOpponent(userIndex) : userIndex,
              zoneName: "hand",
            },
            from: {
              zoneName: "ingredientsDrawPile",
            },
          },
          cards: [...Array(cardNumber).keys()].map(
            (index) => gameState.ingredientsDrawPile[index]
          ),
        },
      };
    case "stealBoard":
      if (cardNumber !== actionData?.selected?.length) {
        throw Error("Card number is incorrect.");
      }
      return {
        type: "moveCard",
        data: {
          zone: {
            to: {
              user: userIndex,
              zone: "board",
            },
            from: {
              user: getOpponent(userIndex),
              zone: "board",
            },
          },
          cards: [...actionData.selected],
        },
      };
    case "discardBasicBoard":
      if (cardNumber !== actionData?.selected?.length) {
        throw Error("Card number is incorrect.");
      }
      return {
        type: "moveCard",
        data: {
          zone: {
            to: {
              zoneName: "basicRecipes",
            },
            from: {
              user: player === "others" ? getOpponent(userIndex) : userIndex,
              zoneName: "hand",
            },
          },
          cards: [...actionData.selected],
        },
      };
    case "retainRecipes":
    case "refresh":
      const numberOfCard =
        gameState.users[userIndex].maxRefresh -
        gameState.users[userIndex].hand.length;
      return cardActionHelper(
        "drawCard",
        { cardNumber: numberOfCard, player: "self" },
        mainData
      );
    case "placeIngredient":
      if (cardNumber !== actionData?.selected?.length) {
        throw Error("Card number is incorrect.");
      }
      return {
        type: "moveCard",
        data: {
          zone: {
            to: {
              user: userIndex,
              zoneName: "board",
            },
            from: {
              user: userIndex,
              zoneName: "hand",
            },
          },
          cards: [...actionData.selected],
        },
      };
      break;
    // case "wish":
    //   //unlimited energy but can't draw
    //   break;
    // case "stealIngredient":
    //   //steal 2, discard 1, add one to hand
    //   break;
    // case "discardCard":
    //   break;
    // case "offering":
    //   //give opponent 2, discard basic or advanced recipe
    //   break;
    // case "stealRecipe":
    //   //steal and use immediately
    //   break;
    // case "fry":
    //   //oponent discards 4 ingredients
    //   break;

    // case "supremacy":
    //   //win game
    //   break;
    // case "useAbility":
    //   break;
    // case "swapHands":
    //   break;
    // case "gainUmami":
    //   //action.amount
    //   break;
    // case "sugarRush":
    //   //discard all sweets on boards and hands
    //   break;
  }
  // updateGameState(roomCode, gameState);
  // io.sockets.in(roomCode).emit("updateGameState", gameState);
}
