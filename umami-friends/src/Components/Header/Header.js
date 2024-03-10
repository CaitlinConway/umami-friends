import React from 'react';
import { FaRegCopy } from 'react-icons/fa';

import useGameConditions from '../../Hooks/useGameConditions';
import { playerRoles } from '../../Constants/roles';
import './Header.css';

export const Header = (props) => {
	const { gameState, socket, roomCode } = useGameConditions();
	const opponentsReady = gameState?.users?.length === 2 || gameState?.users?.length === 4;

	return (
		<div className='header'>
			<div className='flexItem'>
				<div className='roomCodeContainer'>
					<span>Room Code: {props.roomCode}</span>
					<FaRegCopy className='copyIcon' onClick={() => navigator.clipboard.writeText(props.roomCode)} />
				</div>
				<div>
					<button className='drawButton' onClick={props.drawCard}>
						DRAW 3 CARDS
					</button>
					<button
						className='actionButton'
						onClick={() => playerRoles[props.role]?.userAction(socket, roomCode)}
					>
						TAKE ROLE ACTION
					</button>
				</div>
			</div>
			<div className='playerImageContainer flexItem'>
				{props.role && (
					<img
						className='roleIconImage'
						src={require(`../../Pictures/${props.role}.png`)}
						alt='Player Role Icon'
					/>
				)}
			</div>
			<div className='playerNameContainer flexItem'>
				<p>
					{props.userName}
					<br />
					(You)
				</p>
			</div>
			<div className='logoContainer flexItem'>
				<img
					className='gameLogo'
					src={require('../../Pictures/UmamiFriendsFavicon.png')}
					alt='umamiFriendsLogo'
				/>
			</div>
			<div className='opponentNameContainer flexItem'>
				{!opponentsReady && <p className='waiting'>Waiting for opponents...</p>}
				{opponentsReady && (
					<p>
						{`${props?.opponent?.name}`}
						<br />
						(Opponent)
					</p>
				)}
			</div>
			<div className='opponentImageContainer flexItem'>
				{opponentsReady && props?.opponent?.role && (
					<img
						className='roleIconImage'
						src={require(`../../Pictures/${props?.opponent?.role}.png`)}
						alt='Opponent Role Icon'
					/>
				)}
			</div>
			<div className='startEndButtonContainer flexItem'>
				{gameState.playerTurn === 0 && (
					<button className='startEndButton' disabled={!opponentsReady} onClick={props.startGame}>
						START GAME
					</button>
				)}
				{gameState.playerTurn !== 0 && !props.currentPlayer && <div>{`${props?.opponent?.name}'s Turn`}</div>}
				{props.currentPlayer && (
					<button className='startEndButton' onClick={props.endTurn}>
						END TURN
					</button>
				)}
			</div>
		</div>
	);
};
