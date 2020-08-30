/**
 * Fill in the blanks for an object
 * @param {boolean} condition Trigger to iterate or maintain existing values
 * @param {Object} object New target object
 * @param {*} [value=''] Value to be iterated
 * @returns {Object}
 */
function iterateEntries (condition, object, value = '') {
  return !condition && (!!object && object.constructor === Object)
    ? (Object.keys(object)
        .forEach((key) => object[key] = value),
      object)
    : object
}

module.exports = iterateEntries