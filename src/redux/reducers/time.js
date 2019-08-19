import * as types from '../../constants/ActionTypes';
import {timePerTurn} from '../../constants/Constants';

const initialState = {
	countdown: timePerTurn,
	totalTime: 0,
};

function time(state = initialState, {type, payload}){
	switch(type){
		case types.DECREMENT_COUNTDOWN:
			return{
				...state,
				countdown: state.countdown - payload
			};
			
		case types.RESET_COUNTDOWN:
			return{
				...state,
				countdown: timePerTurn
			};
			
		case types.INCREMENT_TIME:
			return{
				...state,
				totalTime: state.totalTime + payload
			};
		
		case types.RESET_TIME:
			return{
				...state,
				totalTime: 0
			};
		
		default:
			return state;
	}
}

export default time;
