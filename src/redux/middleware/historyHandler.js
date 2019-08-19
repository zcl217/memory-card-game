import * as types from '../../constants/ActionTypes';
import {blacklist} from '../../constants/Constants';

const historyHandler = store => next => action => {
	
	//don't process actions in the blacklist
	if (blacklist.has(action.type)) return next(action);
	
	const {playingHistory} = store.getState().homeScreen;
	const {gameOver} = store.getState().board;
	
	//begin replaying the game
	if (action.type === types.PLAY_HISTORY){
		
		replay(action.payload, next);
		
	//check if we can record the action into the history array
	}else if (!gameOver && !playingHistory){
		
		let time = window.performance.now();
		
		let payloadRecord = {
			...action,
			time
		}
		
		let actionRecord = {
			type: types.UPDATE_ACTION_HISTORY,
			payload: payloadRecord
		}
		
		next(actionRecord);
	}
	
	return next(action);
};

function replay(actionHistory, next, index = 0){
	if (index >= actionHistory.length) return;
	
	let curItem = actionHistory[index];
	
	//dispatch the actions with the same delay as the user's delay
	let delay = 0;
	if (index < actionHistory.length - 1){
		let nextItem = actionHistory[index+1];
		delay = nextItem.time - curItem.time;
	}
	
	let newAction = {
		type: curItem.type,
		payload: curItem.payload
	}
	
	next(newAction);
	
	setTimeout(() => {
		replay(actionHistory, next, index+1);
		
		//turn off replay if this is the last item
		if (index === actionHistory.length-1){
			let stopReplay = {
				type: types.TOGGLE_REPLAY,
				payload: false
			}
			next(stopReplay);
		}
	}, delay);
};

export default historyHandler;