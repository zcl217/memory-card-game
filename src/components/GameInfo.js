import React, {Component} from 'react';		
import {timeConverter} from '../utils/Utils';

class GameInfo extends Component{

	render(){
		const {
			totalTime,
			countdown,
			cardFlips,
			score,
			gameOver
		} = this.props;
		
		if (!gameOver){
			return (
				<InGameStats
					totalTime = {totalTime}
					score = {score}
					countdown = {countdown}
				/>
			);
		}else{
			return (
				<EndGameStats
					totalTime = {totalTime}
					score = {score}
					cardFlips = {cardFlips}
				/>
			);
		}
	}
}

function InGameStats(props){
	
	const {totalTime, countdown, score} = props;
	
	let timeUsed = timeConverter(totalTime);
	
	let redFont;
	if (countdown <= 3) redFont = "red";
	
	return (
		<div className = "statsContainer">
			<span> Total time used: {timeUsed} </span>
			<span> Your score: {score} </span>
			<span className = {redFont}>
				Remaining time to find pair: {countdown}
			</span>	
		</div>
	);
}

function EndGameStats(props){
	
	const {totalTime, score, cardFlips} = props;
	
	//don't display stats if none exist yet
	if (totalTime === 0) return null;
	
	let timeUsed = timeConverter(totalTime);
	
	return (
		<div>
			<div className = "stat">
				Your score: {score}
			</div>
			<div className = "stat">
				Total time used: {timeUsed}
			</div>
			<div className = "stat">
				Number of card flips: {cardFlips}
			</div>
		</div>
	);
}

export default GameInfo;