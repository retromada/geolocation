/**
 * Choose an item from an array
 * @param {Array<*>} array
 */
function random (array) {
  return Array.isArray(array) && array.length
    ? array[~~(Math.random() * array.length)]
    : array
}

module.exports = random