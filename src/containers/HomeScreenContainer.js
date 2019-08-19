import React, {Component} from 'react';
import {connect} from 'react-redux';
import {shuffle} from '../utils/ArrayFunctions';
import HomeScreen from '../components/HomeScreen';
import * as HomeScreenActions from '../redux/actions/HomeScreenActions';
import * as BoardActions from '../redux/actions/BoardActions';
import * as TimeActions from '../redux/actions/TimeActions';
import * as GameInfoActions from '../redux/actions/GameInfoActions';
import {
	cardNumber,
	timePerTurn,
	startDelay,
	defaultSortProperty,
	displayAmount
} from '../constants/Constants';

class ConnectedHomeScreenContainer extends Component{
	
	constructor(){
		super();
		
		this.sortCriteria = defaultSortProperty;
		this.sortByProperty = this.sortByProperty.bind(this);
		this.initializeBoard = this.initializeBoard.bind(this);
		this.restartGame = this.restartGame.bind(this);
		this.replayGame = this.replayGame.bind(this);
		this.resetInfo = this.resetInfo.bind(this);
	}
	
	restartGame(){
		const {resetInfo, initializeBoard} = this;
		const {
			startGame,
			resetActionHistory
		} = this.props;
		
		resetInfo();
		resetActionHistory();
		
		startGame();
		initializeBoard();
	}
	
	sortByProperty(property){
		this.sortCriteria = property;
		this.props.sortScores(property);
	}
	
	initializeBoard(){
		const {
			generateCards,
			toggleCardSelection,
			toggleCardReveal
		} = this.props;
		
		generateCards(cardNumber);
		
		//temporarily disable card clicking
		toggleCardSelection(false);
		
		//randomly reveal some of the cards for a few seconds
		let revealNumber = Math.floor(cardNumber/5) + 1;
		
		let revealIndices = [];
		for (let i = 0; i < cardNumber; i++) revealIndices[i] = i;
		
		shuffle(revealIndices);
		
		for (let i = 0; i < revealNumber; i++){
			let index = revealIndices[i];
			toggleCardReveal(index);
		}
		
		setTimeout(() => {
			for (let i = 0; i < revealNumber; i++){
				let index = revealIndices[i];
				toggleCardReveal(index);
			}
				
			//renable card selection after hiding the cards
			toggleCardSelection(true);	
		}, startDelay);
	}
	
	replayGame(){
		const {resetInfo} = this;
		const {
			actionHistory,
			startGame,
			playHistory,
			resetCardStatus,
			toggleCardSelection,
			toggleReplay
		} = this.props;
		
		toggleReplay(true);
		
		//reset every card's foundPair and revealed property
		resetCardStatus();
		
		toggleCardSelection(false);
		resetInfo();
		startGame();
		
		playHistory(actionHistory);
	}
	
	resetInfo(){
		const{
			resetCardFlips,
			resetSelection,
			resetTime,
			resetCountdown,
			resetScore,
		} = this.props;
		
		resetCardFlips();
		resetSelection();
		resetTime();
		resetCountdown(timePerTurn);
		resetScore();
	}
	
	render(){
		const {
			sortByProperty,
			restartGame,
			replayGame,
			sortCriteria
		} = this;
		const {
			gameOver,
			sortedHighScores,
			totalTime
		} = this.props;
		
		if(!gameOver) return null;
		
		return(
			<HomeScreen
				highScores = {sortedHighScores}
				gameOver = {gameOver}
				displayAmount ={displayAmount}
				restartGame = {restartGame}
				replayGame = {replayGame}
				sortByProperty = {sortByProperty}
				sortCriteria = {sortCriteria}
				totalTime = {totalTime}
			/>
		);
	}
}


const mapStateToProps = state => {
	return{
		sortedHighScores: state.homeScreen.sortedHighScores,
		gameOver: state.board.gameOver,
		intervalHandler: state.time.intervalHandler,
		totalTime: state.time.totalTime,
		actionHistory: state.gameInfo.actionHistory
	};
};

const mapDispatchToProps = {
	...HomeScreenActions,
	...BoardActions,
	...TimeActions,
	...GameInfoActions
};

const HomeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedHomeScreenContainer);

export default HomeScreenContainer;