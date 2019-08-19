import React, {Component} from 'react';
import {connect} from 'react-redux';
import GameInfo from '../components/GameInfo';
import * as TimeActions from '../redux/actions/TimeActions';
import * as GameInfoActions from '../redux/actions/GameInfoActions';
import {endGame} from '../redux/actions/BoardActions';
import {startDelay} from '../constants/Constants';

class ConnectedGameInfoContainer extends Component{
	
	constructor(){
		super();
		
		//keeps track of the ID for setInterval
		this.intervalHandler = -1;
		this.tick = this.tick.bind(this);
	}
	
	componentDidUpdate(){
		const {gameOver, playingHistory} = this.props;
		
		if (
			gameOver === false && 
			playingHistory === false &&
			this.intervalHandler === -1
		){
			this.intervalHandler = 0;
			setTimeout(() => {
				this.intervalHandler = setInterval(this.tick, 1000);
			}, startDelay);
		}
	}
	
	tick(){
		const {
			decrementCountdown,
			incrementTime,
			gameOver,
			countdown,
			endGame
		} = this.props;
		
		//if the player runs out of time
		if (countdown === 0){
			endGame();
			clearInterval(this.intervalHandler);
			this.intervalHandler = -1;
			return;
			
		//if all cards have been revealed
		}else if (gameOver){
			clearInterval(this.intervalHandler);
			this.intervalHandler = -1;
			return;
		}
		
		decrementCountdown(1);
		incrementTime(1);	
	}
	
	render(){
		const {
			totalTime,
			countdown,
			gameOver,
			score,
			cardFlips
		} = this.props;
		
		return(
			<GameInfo
				totalTime = {totalTime}
				countdown = {countdown}
				gameOver = {gameOver}
				score = {score}
				cardFlips = {cardFlips}
			/>
		);
	}
}

const mapStateToProps = state => {
	return{
		totalTime: state.time.totalTime,
		countdown: state.time.countdown,
		intervalHandler: state.time.intervalHandler,
		cardFlips: state.gameInfo.cardFlips,
		score: state.gameInfo.score,
		playingHistory: state.homeScreen.playingHistory,
		gameOver: state.board.gameOver,
	};
};

const mapDispatchToProps = {
	...TimeActions,
	...GameInfoActions,
	endGame
};

const GameInfoContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedGameInfoContainer);

export default GameInfoContainer;