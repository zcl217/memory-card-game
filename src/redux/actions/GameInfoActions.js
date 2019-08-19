import * as types from '../../constants/ActionTypes';

export const incrementCardFlips = (payload) => ({
	type: types.INCREMENT_CARD_FLIPS,
	payload: payload
});

export const resetCardFlips = () => ({
	type: types.RESET_CARD_FLIPS
});

export const incrementScore = (payload) => ({
	type: types.INCREMENT_SCORE,
	payload: payload
});

export const resetScore = () => ({
	type: types.RESET_SCORE
});

export const updateActionHistory = (action) => ({
	type: types.UPDATE_ACTION_HISTORY,
	payload: action
});

export const resetActionHistory = () => ({
	type: types.RESET_ACTION_HISTORY
});