import React from 'react';
import './Header.css';
import useGameConditions from '../../Hooks/useGameConditions';

export const Header = (props) => {
	const { gameState } = useGameConditions();
	const opponentsReady = gameState?.users?.length === 2 || gameState?.users?.length === 4;
	return (
		<div className='header'>
			<div className='flexItem'>
				<p>Room Code: {props.roomCode}</p>
				<div>
					<button className='drawButton' onClick={props.drawCard}>
						DRAW 3 CARDS
					</button>
					<button className='actionButton'>TAKE ROLE ACTION</button>
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

// return (
//   <div className='header'>
//     <div className='header-middle'>
//       <div className='header-userName'>User: {props.userName}</div>
//       <div className='header-roomCode'>Room Code: {props.roomCode}</div>
//     </div>
//     <div className='roleIcon'>
//       {props.role && (
//         <img className='roleIconImage' src={require(`../../Pictures/${props.role}.png`)} alt='Example' />
//       )}
//     </div>
//     {!opponentsReady && <div className='waiting'>Waiting for opponents...</div>}
//     {opponentsReady && (
//       <div className='opponentHeader'>
//         {' '}
//         Opponent: {`${props?.opponent?.name}`}
//         <div className='roleIcon'>
//           {props?.opponent?.role && (
//             <img
//               className='roleIconImage'
//               src={require(`../../Pictures/${props?.opponent?.role}.png`)}
//               alt='Example'
//             />
//           )}
//         </div>
//       </div>
//     )}
//     <img src={require('../../Pictures/UmamiFriendsFavicon.png')} alt='umamiFriendsLogo' />
//     <div className='header-right'>
//       {gameState.playerTurn === 0 && (
//         <button className='start-button' disabled={!opponentsReady} onClick={props.startGame}>
//           Start Game
//         </button>
//       )}
//       {props.currentPlayer && (
//         <button className='drawcard-button' onClick={props.drawCard}>
//           Draw Card
//         </button>
//       )}
//       {gameState.playerTurn !== 0 && !props.currentPlayer && (
//         <div className='waiting'>{`${props?.opponent?.name}'s Turn`}</div>
//       )}
//       {props.currentPlayer && (
//         <button className='start-button' onClick={props.endTurn}>
//           End Turn
//         </button>
//       )}
//     </div>
//   </div>
// );

// .header {
// 	color: rgb(0, 0, 0);
// 	padding: 10px;
// 	display: grid;
// 	grid-template-columns: 1fr 1fr 1fr 4fr 1fr; /* Four sections with specified fractions */
// 	align-items: center;
// 	text-align: left;
// 	margin-bottom: 40px;
// }

// .header-middle {
// 	margin-left: 20px;
// }

// .header-userName,
// .header-roomCode {
// 	margin-bottom: 5px;
// }

// .header-right {
// 	display: flex;
// 	align-items: center;
// 	justify-content: flex-end; /* Align items to the far right */
// }

// .start-button {
// 	background-color: #4caf50;
// 	color: white;
// 	border: none;
// 	padding: 10px 15px;
// 	font-size: 16px;
// 	cursor: pointer;
// }
//
// .waiting {
// 	padding: 5px;
// }
// .opponentHeader {
// 	padding: 10px;
// }
