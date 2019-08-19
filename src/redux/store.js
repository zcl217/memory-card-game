import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import logger from './middleware/logger';
import historyHandler from './middleware/historyHandler';

const middlewares = [historyHandler, logger];

const store = createStore(
	rootReducer,
	applyMiddleware(...middlewares)
);

export default store;