import React, {Component} from 'react';		
import {timeConverter} from '../utils/Utils';
import {sortProperties, defaultSortProperty} from '../constants/Constants';

class HomeScreen extends Component{
	
	componentWillMount(){
		this.props.sortByProperty(defaultSortProperty);
	}

	render(){
		const {
			highScores,
			displayAmount,
			restartGame,
			replayGame,
			sortByProperty,
			sortCriteria,
			totalTime
		} = this.props;
		
		let highScoreList = null;
		let noScores = null;
		
		if (highScores.length > 0){
			highScoreList = highScores.slice(0, displayAmount);
			
			highScoreList = highScoreList.map((score, i) => {
					let timeUsed = timeConverter(score.time);
					return(
						<li key = {score.key}>
							<p>Time: {timeUsed}</p>
							<p>Card flips: {score.cardFlips}</p>
						</li>
					);
				});
		}else{
			noScores = (
				<p className = "center bold"> No highscores yet! </p>
			);
		}
		
		let gameReplayer = null;
		
		if (totalTime > 0){
			gameReplayer = (
				<button
					type = "button"
					className = "replayGameButton"
					onClick = {replayGame}
				>
					Replay Game
				</button>
			);
		}
		
		let timeButton = "sortButton";
		let cardFlipsButton = "sortButton";
		if (sortCriteria === "time"){
			timeButton += " selected";
		}else{
			cardFlipsButton += " selected";
		}
		
		return (
			<div>
				<div className = "center">
					<button
						type = "button"
						className = "restartGameButton"
						onClick = {restartGame}
					>
						Start Game
					</button>
					
					{gameReplayer}
					
				</div>
				
				<div className = "highScoresHeader">
					Highscores
				</div>

				<div className = "sortButtonsContainer">
					<button
						type = "button"
						className = {timeButton}
						onClick = {() => sortByProperty(sortProperties.TIME)}
					>
						Sort by time
					</button>
					<button
						type = "button"
						className = {cardFlipsButton}
						onClick = {() => sortByProperty(sortProperties.CARDFLIPS)}
					>
						Sort by card flips
					</button>
				</div>
				
				{noScores}
				
				<ol>
					{highScoreList}
				</ol>
			</div>
		);
	}
}

export default HomeScreen;