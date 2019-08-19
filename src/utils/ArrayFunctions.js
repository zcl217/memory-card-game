/**
 * Shuffles an array.
 * @param  {Array} arr An array to shuffle.
 * @return {Array}     The shuffled array.
 */
function shuffle(arr) {
    let j, x;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

/**
 * Merge sorts an array of objects by the designated property.
 * @param  {Array}  arr      An array of objects to sort.
 * @param  {String} property The property to sort by.
 * @return {Array}           The sorted array.
 */
function mergeSort(arr, property)
{
    if (arr.length < 2) return arr;
	
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
	
    return merge(
		mergeSort(left, property),
		mergeSort(right, property),
		property
	);
}

/**
 * Merges two arrays together.
 * @param  {Array}  left       First array to merge.
 * @param  {Array}  right      Second array to merge.
 * @param  {String} property   The property to sort by.
 * @return {Array}             The merged array.
 */
function merge(left, right, property)
{
    let result = [];

    while (left.length > 0 && right.length > 0) {
        if (left[0][property] <= right[0][property]) {
			result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length > 0){
        result.push(left.shift());
	}
	
    while (right.length > 0){
        result.push(right.shift());
	}

    return result;
}

export {shuffle, mergeSort};