//we can log the actions here
const logger = store => next => action => {

	return next(action);
};

export default logger;