import React, {Component} from 'react';
import {connect} from 'react-redux';
import {cardNumber, defaultSortProperty} from '../constants/Constants';
import Board from '../components/Board';
import * as BoardActions from '../redux/actions/BoardActions';
import * as GameInfoActions from '../redux/actions/GameInfoActions';
import {resetCountdown} from '../redux/actions/TimeActions';
import {addScore, sortScores} from '../redux/actions/HomeScreenActions';
import uuidv1 from 'uuid/v1';

class ConnectedBoardContainer extends Component{
	
	constructor(){
		super();
		
		this.onCardClick = this.onCardClick.bind(this);
	}
	
	onCardClick(cardId, currentCardIndex){		
		const {
			toggleCardReveal,
			incrementCardFlips,
			allowCardSelection
		} = this.props;
		
		if (!allowCardSelection) return;
		
		//reveal the clicked card
		toggleCardReveal(currentCardIndex);
		
		let addFlips = 1;
		incrementCardFlips(addFlips);
		//handle the clicked card
		this.pairHandler(cardId, currentCardIndex, addFlips);
	}
	
	pairHandler(cardId, currentCardIndex, addFlips){
		
		const {
			previousCardId,
			previousCardIndex,
			selectCard,
			updatePair,
			resetSelection,
			incrementScore,
			score,
			timePerTurn,
			resetCountdown,
			toggleCardReveal,
			toggleCardSelection,
			endGame,
			totalTime,
			addScore,
			cardFlips,
			sortScores
		} = this.props;
			
		//no previous card was selected
		if (previousCardId === null){
			selectCard({cardId, index: currentCardIndex});
			
		//previous card matches the current card
		}else if (previousCardId === cardId){			
			updatePair([previousCardIndex, currentCardIndex]);
			
			//unselect the card to start a new pairing
			resetSelection();
			
			//reset the timer
			resetCountdown(timePerTurn);
			
			let pointsEarned = 2;
			
			//if all cards have been revealed, end game
			if ((score + pointsEarned) === cardNumber){
				let newScore = {
					time: totalTime,
					cardFlips: cardFlips + addFlips,
					key: uuidv1()
				};
				addScore(newScore);
				sortScores(defaultSortProperty);
				endGame();
			}
			
			incrementScore(pointsEarned);
			
		//previous card does not match the current card
		}else{
			//temporarily disable card clicking
			toggleCardSelection(false);
			
			//hide the two cards
			setTimeout(() => {
				toggleCardReveal(previousCardIndex);
				toggleCardReveal(currentCardIndex);
				
				//renable card selection after hiding the cards
				toggleCardSelection(true);
			}, 1000);
			
			//unselect the card to start a new pairing
			resetSelection();
		}
	}
	
	render(){
		
		const {cards, gameOver, totalTime} = this.props;
		
		if (gameOver) return null;
		
		return(
			<Board
				cards = {cards}
				onCardClick = {this.onCardClick}
				totalTime = {totalTime}
				
			/>
		);
	}
}

const mapStateToProps = state => {
	return{
		previousCardId: state.board.previousCardId,
		previousCardIndex: state.board.previousCardIndex,
		cards: state.board.cards,
		allowCardSelection: state.board.allowCardSelection,
		gameOver: state.board.gameOver,
		score: state.gameInfo.score,
		cardFlips: state.gameInfo.cardFlips,
		totalTime: state.time.totalTime,
		countdown: state.time.countdown
	};
};

const mapDispatchToProps = {
	...BoardActions,
	...GameInfoActions,
	resetCountdown,
	addScore,
	sortScores
};

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedBoardContainer);

export default BoardContainer;