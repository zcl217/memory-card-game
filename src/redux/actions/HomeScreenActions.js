import * as types from '../../constants/ActionTypes';

export const addScore = (score) => ({
	type: types.ADD_SCORE,
	payload: score
});

export const sortScores = (property) => ({
	type: types.SORT_SCORES,
	payload: property
});

export const playHistory = (actions) => ({
	type: types.PLAY_HISTORY,
	payload: actions
});

export const toggleReplay = (payload) => ({
	type: types.TOGGLE_REPLAY,
	payload: payload
});