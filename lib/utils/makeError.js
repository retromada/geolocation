const code = Symbol('code')

/**
 * Extend an error
 * @param {Error} Base Base error to extend
 * @returns {ExtendedError}
 */
function makeError (Base) {
  return class ExtendedError extends Base {
    constructor (key, ...args) {
      super(args.join(' '))

      this[code] = key

      if (Error.captureStackTrace) Error.captureStackTrace(this, ExtendedError)
    }

    get name () {
      return `${super.name} [${this[code]}]`
    }

    get code () {
      return this[code]
    }
  }
}

module.exports = {
  TypeError: makeError(TypeError)
}