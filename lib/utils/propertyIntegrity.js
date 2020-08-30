/**
 * Analyzes the integrity of an object's property
 * @param {Object} object Object to be checked for integrity
 * @param {string} property Name of the property to be verified
 */
function propertyIntegrity (object, property) {
  return object && Object.prototype.hasOwnProperty.call(object, property)
    ? object[property]
    : undefined
}

module.exports = propertyIntegrity