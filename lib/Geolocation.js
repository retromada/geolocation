const locations = require('./data/geographic_locations.json')

const random = require('./utils/random.js')
const iterateEntries = require('./utils/iterateEntries.js')
const propertyIntegrity = require('./utils/propertyIntegrity.js')
const { TypeError } = require('./utils/makeError.js')

/**
 * Generates locations available on Steam
 * @param {number} [amount=1] Quantity of locations to be generated
 * @returns {Promise<Object[]>}
 */
function Geolocation (amount = 1) {
  return new Promise((resolve) => {
    if (isNaN(amount)) {
      throw new TypeError('GEOLOCATION_INVALID_PARAMETER', 'amount', 'a number')
    }

    amount = amount > 0 ? amount : 1

    resolve(Array(amount).fill().map(() => {
      let country, state, city

      country = random(locations.countries)
      if (country.states) state = random(country.states)
      if (state && state.cities) city = random(state.cities)

      return {
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
      }
    }))
  })
}

Geolocation.random = random
Geolocation.iterateEntries = iterateEntries
Geolocation.propertyIntegrity = propertyIntegrity

module.exports = Geolocation