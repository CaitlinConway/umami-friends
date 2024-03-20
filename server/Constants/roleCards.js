export default {
    Ramona: {
        name: "Ramona",
        fullName: "Ramona The Raccoon",
        pictureName: "Ramona",
        start: {
            ingredientSweet: 2,
            cards: [],
        },
        cost: {
            ingredientSweet: 1,
        },
        energy: 1,
        description:
            "Draw the top 3 cards from the discard pile. Take 1 card. Place the candy spent to use this ability on top of the discard pile.",
        getActions: (actionData, userIndex) => [
            {
                type: "moveCard",
                data: {
                    zone: {
                        to: {
                            user: userIndex,
                            zoneName: "hand",
                        },
                        from: {
                            zoneName: "discardPile",
                            indexFromEnd: actionData.indexFromEnd,
                        },
                    },
                    cards: [actionData.selected],
                },
            },
            {
                type: "moveCard",
                data: {
                    zone: {
                        to: {
                            user: "",
                            zoneName: "discard",
                        },
                        from: {
                            user: userIndex,
                            zoneName: "hand",
                        },
                    },
                    cards: [actionData.selected],
                },
            },
        ],
    },
    Shinra: {
        name: "Shinra",
        fullName: "Shinra The Shiba",
        pictureName: "Shinra",
        start: {
            // no specific ingredients
            cards: ["spicyRamen", "spicyRamen"],
        },
        cost: {
            ingredientSpicy: 4,
        },
        energy: 1,
        description:
            "Steal a Basic|Common Recipe from an opponent and use its active ability immediately",
        getActions: (actionData, userIndex) => [
            {
                type: "moveCard",
                data: {
                    zone: {
                        to: {
                            user: userIndex,
                            zoneName: "board",
                        },
                        from: {
                            user: actionData.chosenUser,
                            zoneName: "board",
                        },
                    },
                },
                cards: [actionData.selected],
            },
            {
                type: "useCard", // TODO: make sure to add this type also to cardActionHelper,
                data: {
                    card: actionData.selected[0], // ??
                    selected: [...actionData.selected],
                    ...actionData, // ?
                },
            },
        ],
    },
    Coco: {
        name: "Coco",
        fullName: "Coco the Cat",
        pictureName: "Coco",
        start: {
            cards: ["tacoParty"],
        },
        cost: {}, // no cost
        energy: 0, // passive
        description:
            "(Passive) When placing an ingredient as your only action on a turn, you may place a second ingredient as well.",
        getActions: (actionData, userIndex) => [
            {
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
                },
                cards: [...actionData.selected],
            },
        ],
    },
    Damien: {
        name: "Damien",
        fullName: "Damien  the Duck",
        pictureName: "Damien",
        start: {
            ingredientEgg: 2,
            cards: [],
        },
        cost: {
            ingredientEgg: 1,
        },
        energy: 1,
        description:
            "Discard a Rare Recipe from the store. Take Okonomiyaki from the Rare Deck and add it to the store.",
        getActions: (actionData, userIndex) => [
            {
                type: "moveCard",
                data: {
                    zone: {
                        to: {
                            user: "", //left blank intentionally
                            zoneName: "discard",
                        },
                        from: {
                            user: "",
                            zoneName: "rareRecipes",
                        },
                    },
                },
                cards: [...actionData.selected],
            },
            {
                type: "moveCard",
                data: {
                    zone: {
                        to: {
                            user: "", //left blank intentionally
                            zoneName: "rareRecipes",
                        },
                        from: {
                            user: "",
                            zoneName: "recipesDrawPile",
                        },
                    },
                },
                cards: ["Okonomiyaki"], // TODO: make sure this action works...what if not in piple?
            },
        ],
    },
    Fronk: {
        name: "Fronk",
        fullName: "Fronk the Frog",
        pictureName: "Fronk",
        cost: {
            ingredientSauce: 3,
            ingredientBurger: 2, // TODO: ??? burger ingredients?
        },
        energy: 1,
        description: "Add 2 Fancy Burgers to your board.",
        getActions: (actionData, userIndex) => [
            {
                type: "moveCards",
                zone: {
                    to: {
                        user: userIndex,
                        zoneName: "boards",
                    },
                    from: {
                        user: "", //intentionally left blank
                        zoneName: "basicRecipes",
                    },
                },
                cards: [...actionData.selected], // UI should pre-fill this with fancy burgers, no user selection if possible
            },
        ],
    },
    Sasha: {
        name: "Sasha",
        fullName: "Sasha the Shepherd",
        nickname: "The Smoke",
        pictureName: "Sasha",
        cost: {},
        energy: 0,
        description:
            "(Passive) After every second recipe (2, 4, 6...) that you build in a single turn, draw + 1 card.",
        getActions: (actionData, userIndex) => [
            {
                type: "moveCard",
                zone: {
                    to: {
                        user: userIndex,
                        zoneName: "hand",
                    },
                    from: {
                        user: "",
                        zoneName: "ingredientsDrawPile",
                    },
                },
                cards: [...actionData.selected],
            },
        ],
    },
};
