import * as types from '../../constants/ActionTypes';
import {cloneDeep} from 'lodash';

const initialState = {
	score: 0,
	cardFlips: 0,
	actionHistory: []
};

function gameInfo(state = initialState, {type, payload}){
	switch(type){
		case types.INCREMENT_CARD_FLIPS:
			return{
				...state,
				cardFlips: state.cardFlips + payload
			};
		
		case types.RESET_CARD_FLIPS:
			return{
				...state,
				cardFlips: 0
			};
		
		case types.INCREMENT_SCORE:
			return{
				...state,
				score: state.score + payload
			};
			
		case types.RESET_SCORE:
			return{
				...state,
				score: 0
			};
			
		case types.UPDATE_ACTION_HISTORY:
			let updatedActionHistory = cloneDeep(state.actionHistory);
			updatedActionHistory.push(payload);
			return{
				...state,
				actionHistory: updatedActionHistory
			};
			
		case types.RESET_ACTION_HISTORY:
			return{
				...state,
				actionHistory: []
			};
			
		default:
			return state;
	}
}

export default gameInfo;