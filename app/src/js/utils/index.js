
export function filterObject(object, predicate) {
  const result = {};
  Object.keys(object).forEach((key) => {
    if (predicate(object[key], key, object)) {
      result[key] = object[key];
    }
  });
  return result;
}

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

export function getRandomId() {
  // good enough implementation for what we need.
  return Math.random().toString(36).substr(2, 10);
}
