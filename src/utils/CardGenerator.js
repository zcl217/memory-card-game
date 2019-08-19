import {shuffle} from './ArrayFunctions';
import uuidv1 from 'uuid/v1';
const {wordList} = require('../api/wordList');
/**
 * Generates a list of cards to display on the board
 * @param  {Integer} payload  The number of cards to generate.
 * @return {Array}            An array containing the cards.
 */
function generateCards(payload){
	
		let cardNumber = payload;
		
		let randomIndices = [];
		
		for (let i = 0; i < wordList.length; i++){
			randomIndices[i] = i;
		}

		shuffle(randomIndices);
		
		let selectedItems = [];
		
		//randomly pick items
		for (let i = 0, j = 0; i < cardNumber; i += 2){
			if (j >= randomIndices.length) break;
			let randomIndex = randomIndices[j];
			let curItem = wordList[randomIndex];
			
			if (validateCard(curItem)){
				selectedItems.push({
					text: curItem.word, 
					cardId: i
				});
				selectedItems.push({
					text: curItem.definition,
					cardId: i
				});
			}else{
				i -= 2;
			}
			
			j++;
		}
		
		let cards = [];
		
		//create cards from the selected items
		for (let i = 0; i < cardNumber; i++){
			if (selectedItems[i].cardId === undefined) break;
			let cardId = selectedItems[i].cardId;
			let curCard = 
				{
					cardId, 
					key: uuidv1(),
					text: selectedItems[i].text,
					revealed: false,
					foundPair: false
				};
			
			cards.push(curCard);
		}
		
		shuffle(cards);

		return cards;
}

/**
 * Checks a card to see if it has valid properties
 * @param  {Object}  Card  The card to validate.
 * @return {Boolean}       A boolean representing the validity of the card.
 */
function validateCard(card){
	if (card === undefined) return false;
	
	if (
		card.word === undefined || 
		card.definition === undefined
	) return false;
	
	return true;
}

export default generateCards;