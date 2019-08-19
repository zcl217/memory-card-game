/**
 * Converts seconds to mm:ss format
 * @param  {Integer} value The number of seconds to convert.
 * @return {String}        The converted format.
 */
function timeConverter(value) {
	let minutes = Math.floor(value/60);
	let seconds = value%60;
	
	if (minutes < 10) minutes = '0' + minutes;
	if (seconds < 10) seconds = '0' + seconds;
	
	let convertedTime = minutes + ":" + seconds;
	
	return convertedTime;
}

export {timeConverter};