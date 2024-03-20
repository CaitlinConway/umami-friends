import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

import useGameConditions from "../../Hooks/useGameConditions";
import "./Header.css";

export const Header = props => {
    const { gameState, socket, roomCode } = useGameConditions();
    const opponentsReady =
        gameState?.users?.length === 2 || gameState?.users?.length === 4;

    return (
        <div className="header">
            <div className="flexItem">
                <div className="roomCodeContainer">
                    <span>Room Code: {props.roomCode}</span>
                    <FaRegCopy
                        className="copyIcon"
                        onClick={() =>
                            navigator.clipboard.writeText(props.roomCode)
                        }
                    />
                </div>
            </div>
            <div className="playerImageContainer flexItem">
                {props.role && (
                    <div>
                        <img
                            className="roleIconImage"
                            data-tooltip-id={`${props.role}Icon`}
                            src={require(`../../Pictures/${props.role}.png`)}
                            alt={`${props.role} Icon`}
                        />
                        <Tooltip
                            className="roleIconTooltip"
                            id={`${props.role}Icon`}
                            place="bottom"
                            data-tooltip-position-strategy="fixed"
                            border={"none"}
                            opacity={1}
                        >
                            <img
                                className="hoveredImage"
                                alt={`${props.role} Card`}
                                src={require(
                                    `../../Pictures/${props.role}Card.png`
                                )}
                            />
                        </Tooltip>
                    </div>
                )}
            </div>
            <div className="playerNameContainer flexItem">
                <p>
                    {props.userName}
                    <br />
                    (You)
                </p>
            </div>
            <div className="logoContainer flexItem">
                <img
                    className="gameLogo"
                    src={require("../../Pictures/UmamiFriendsFavicon.png")}
                    alt="umamiFriendsLogo"
                />
            </div>
            <div className="opponentNameContainer flexItem">
                {!opponentsReady && (
                    <p className="waiting">Waiting for opponents...</p>
                )}
                {opponentsReady && (
                    <p>
                        {`${props?.opponent?.name}`}
                        <br />
                        (Opponent)
                    </p>
                )}
            </div>
            <div className="opponentImageContainer flexItem">
                {opponentsReady && props?.opponent?.role && (
                    <div>
                        <img
                            className="roleIconImage"
                            data-tooltip-id={`${props?.opponent?.role}Icon`}
                            src={require(
                                `../../Pictures/${props?.opponent?.role}.png`
                            )}
                            alt="Opponent Role Icon"
                        />
                        <Tooltip
                            className="roleIconTooltip"
                            id={`${props?.opponent?.role}Icon`}
                            place="bottom"
                            data-tooltip-position-strategy="fixed"
                            border={"none"}
                            opacity={1}
                        >
                            <img
                                className="hoveredImage"
                                alt={`${props.role} Card`}
                                src={require(
                                    `../../Pictures/${props?.opponent?.role}Card.png`
                                )}
                            />
                        </Tooltip>
                    </div>
                )}
            </div>
            <div className="startEndButtonContainer flexItem">
                {gameState.playerTurn === 0 && (
                    <button
                        className="startEndButton"
                        disabled={!opponentsReady}
                        onClick={props.startGame}
                    >
                        START GAME
                    </button>
                )}
                {gameState.playerTurn !== 0 && !props.currentPlayer && (
                    <div>{`${props?.opponent?.name}'s Turn`}</div>
                )}
                {props.currentPlayer && (
                    <button className="startEndButton" onClick={props.endTurn}>
                        END TURN
                    </button>
                )}
            </div>
        </div>
    );
};
