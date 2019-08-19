import { combineReducers } from 'redux';
import time from './time';
import board from './board';
import gameInfo from './gameInfo';
import homeScreen from './homeScreen';

const rootReducer = combineReducers({
	time,
	board,
	gameInfo,
	homeScreen
});

export default rootReducer;