import * as types from '../../constants/ActionTypes';
import {mergeSort} from '../../utils/ArrayFunctions';
import {cloneDeep} from 'lodash';

const initialState = {
	highScores: [],
	sortedHighScores: [],
	playingHistory: false
};

function homeScreen(state = initialState, {type, payload}){
	switch(type){
		case types.ADD_SCORE:
			let updatedHighScores = cloneDeep(state.highScores);
			updatedHighScores.push(payload);
			return{
				...state,
				highScores: updatedHighScores
			};
		
		case types.SORT_SCORES:
			let originalList = cloneDeep(state.highScores);
			let property = payload;
			let sortedList = mergeSort(originalList, property);
			return {
				...state,
				sortedHighScores: sortedList
			};
			
		case types.TOGGLE_REPLAY:
			return{
				...state,
				playingHistory: payload
			};
		
		default:
			return state;
	}
}

export default homeScreen;