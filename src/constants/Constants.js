import * as types from './ActionTypes';

export const timePerTurn = 20;
export const cardNumber = 12;
export const startDelay = 2000;
export const displayAmount = 10;

export const sortProperties = {
	TIME: "time",
	CARDFLIPS: "cardFlips"
};
export const defaultSortProperty = sortProperties.TIME;

export const blacklist = new Set([
			types.TOGGLE_CARD_SELECTION,
			types.TOGGLE_REPLAY,
			types.GENERATE_CARDS,
			types.ADD_SCORE,
		]);