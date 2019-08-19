import React, {Component} from 'react';
import './App.css';
import GameInfoContainer from './containers/GameInfoContainer';
import HomeScreenContainer from './containers/HomeScreenContainer';
import BoardContainer from './containers/BoardContainer';

class App extends Component{
		
	render(){
		return(
			<div>
				<GameInfoContainer />
				<HomeScreenContainer />
				<BoardContainer	/>		
			</div>
		);
	}
	
}

export default App;
