import * as types from '../../constants/ActionTypes';

export const selectCard = (card) => ({
	type: types.SELECT_CARD,
	payload: card
});

export const resetSelection = () => ({
	type: types.RESET_SELECTION
});

export const toggleCardSelection = (payload) => ({
	type: types.TOGGLE_CARD_SELECTION,
	payload: payload
});

export const endGame = () => ({
	type: types.END_GAME
});

export const startGame = () => ({
	type: types.START_GAME
});

export const generateCards = (cardNumber) => ({
	type: types.GENERATE_CARDS,
	payload: cardNumber
});

export const toggleCardReveal = (index) => ({
	type: types.TOGGLE_CARD_REVEAL,
	payload: index
});

export const updatePair = (indices) => ({
	type: types.UPDATE_PAIR,
	payload: indices
});

export const resetCardStatus = () => ({
	type: types.RESET_CARD_STATUS,
});