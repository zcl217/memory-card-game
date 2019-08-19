import * as types from '../../constants/ActionTypes';

export const decrementCountdown = (payload) => ({
	type: types.DECREMENT_COUNTDOWN,
	payload: payload
});

export const resetCountdown = () => ({
	type: types.RESET_COUNTDOWN
});

export const incrementTime = (payload) => ({
	type: types.INCREMENT_TIME,
	payload: payload
});

export const resetTime = () => ({
	type: types.RESET_TIME
});
