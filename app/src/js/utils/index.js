
/**
 * Filter object by predicate function.
 * @param  {object} object
 * @param  {function} predicate  called with value, key and object being iterated.
 * @return {object}
 */
export function filterObject(object, predicate) {
  const result = {};
  Object.keys(object).forEach((key) => {
    if (predicate(object[key], key, object)) {
      result[key] = object[key];
    }
  });
  return result;
}

/**
 * Returns index in array where object has the given
 * key value pair.
 * @param  {object} array
 * @param  {string} key
 * @param  {mixed}  value
 * @return {number}
 */
export function indexWhere(array, key, value) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < array.length; i++) {
    if (
      typeof array[i] === 'object' &&
      array[i][key] === value
    ) {
      return i;
    }
  }
  return undefined;
}

/**
 * @return {string}
 */
export function getRandomId() {
  // good enough implementation for what we need.
  return Math.random().toString(36).substr(2, 10);
}
