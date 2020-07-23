const locations = require('./geographic_locations.json')
const randomItem = (array) => Array.isArray(array) && array.length ? array[~~(Math.random() * array.length)] : array
const iterateEntries = (condition, object, value = '') => !condition && (!!object && object.constructor === Object) ? (Object.keys(object).forEach((key) => object[key] = value), object) : object
const propertyIntegrity = (object, property) => object && Object.prototype.hasOwnProperty.call(object, property) ? object[property] : undefined

module.exports = () => {
  return new Promise((resolve) => {
    let country, state, city

    country = randomItem(locations.countries)
    if (country.states) state = randomItem(country.states)
    if (state && state.cities) city = randomItem(state.cities)

    resolve({
      country: {
        code: country.code,
        name: country.name
      },
      state: iterateEntries(country.states, {
        code: propertyIntegrity(state, 'code'),
        name: propertyIntegrity(state, 'name')
      }),
      city: iterateEntries(state && state.cities, {
        id: propertyIntegrity(city, 'id'),
        name: propertyIntegrity(city, 'name')
      })
    })
  })
}

module.exports.randomItem = randomItem
module.exports.iterateEntries = iterateEntries
module.exports.propertyIntegrity = propertyIntegrity