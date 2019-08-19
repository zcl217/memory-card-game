import React, {Component} from 'react';

class Board extends Component{
	
	renderCard(card, index, onCardClick){
		return (
			<Card
				key = {card.key}
				onClick = {() => {
					if (!card.revealed)
						onCardClick(card.cardId, index)
					}
				}
				text = {card.text}
				revealed = {card.revealed}
				foundPair = {card.foundPair}
			/>
		);
	}
	
	render(){
		const {gameOver, onCardClick} = this.props;
		
		if (gameOver) return null;
		
		let board = this.props.cards.map((card, i) =>{
						return this.renderCard(card, i, onCardClick)
					});
					
		return(
			<div>
				<div id = "board"> 
					{board} 
				</div>
			</div>
		);
	}
}

function Card(props){
	const {revealed, foundPair, onClick} = props;
	
	let classes = "card";
	classes += !revealed ? " hidden" : "";
	classes += foundPair ? " correct" : "";
	
	return(
		<div
			className = {classes}
			onClick = {onClick}
		>
			{revealed ? props.text: ""}
		</div>
	);
}

export default Board;