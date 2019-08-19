import * as types from '../../constants/ActionTypes';
import generateCards from '../../utils/CardGenerator';
import {cloneDeep} from 'lodash';

const initialState = {
	//null means no card is selected
	previousCardId: null,
	previousCardIndex: null,
	gameOver: true,
	allowCardSelection: true,
	cards: []
};

function board(state = initialState, {type, payload}){
	switch(type){
		case types.SELECT_CARD:
			return{
				...state,
				previousCardId: payload.cardId,
				previousCardIndex: payload.index
			};
			
		case types.RESET_SELECTION:
			return{
				...state,
				previousCardId: null,
				previousCardIndex: null
			};
			
		case types.TOGGLE_CARD_SELECTION:
			return{
				...state,
				allowCardSelection: payload
			};
		
		case types.START_GAME:
			return{
				...state,
				gameOver: false
			};
		
		case types.END_GAME:
			return{
				...state,
				gameOver: true
			};
	
		case types.GENERATE_CARDS:
			return{
				...state,
				cards: generateCards(payload)
			};
			
		case types.TOGGLE_CARD_REVEAL:
			let updatedCards = cloneDeep(state.cards);
			updatedCards[payload].revealed = !updatedCards[payload].revealed;
			return{
				...state,
				cards: updatedCards
			};
			
		case types.UPDATE_PAIR:
			let updatedPair = cloneDeep(state.cards);
			updatedPair[payload[0]].foundPair = true;
			updatedPair[payload[1]].foundPair = true;
			return{
				...state,
				cards: updatedPair
			};
		
		case types.RESET_CARD_STATUS:
			let hiddenCards = cloneDeep(state.cards);
			hiddenCards.forEach((card) => {
				if (card.revealed === true) card.revealed = false;
				if (card.foundPair === true) card.foundPair = false;
			});
			return {
				...state,
				cards: hiddenCards
			};
		
		default:
			return state;
	}
}

export default board;