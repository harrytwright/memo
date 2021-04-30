/**
 * This file is a mess since the logic comes from a node project
 * not made for browser, will adjust later, see the comment above
 * require('@harrytwright/rand') for why
 * */

// const crypto = require('crypto')

/**
 * This will replace everything in the future when I can get it to work outside
 * of node, whenever I can get around to understanding WASM/Emscripten or get
 *the node GYP version to work here
 * */
// const { random } = require('@harrytwright/rand')

const value = Symbol('$_value')

/**
 * Create a random number
 * */
class Random {
  /**
   * @param {number} max - Number.MAX_SAFE_INTEGER
   * */
  constructor (max = Number.MAX_SAFE_INTEGER) {
    this[value] = Math.floor(Math.random() * Math.floor(max))
  }

  /**
   * Display the random number
   *
   * @return {number} The random number
   */
  toNumber () {
    return this[value]
  }
}

/**
 * Create a secure random number via crypto.randomInt
 * */
class SecureRandom extends Random {
  /**
   * Since crypto.randomInt has a max of 2^48, so this is it
   * @private
   * */
  // static get MAX_INTEGER () {
  //   return 281474976710655
  // }

  /**
   * Create a random number with negative values, from -140737488355326
   * to 140737488355326
   * */
  static randomWithNegative () {
    // const range = Math.round(SecureRandom.MAX_INTEGER / 2) - 1
    return new SecureRandom()
  }

  /**
   * Should not be used over the above
   * @internal
   * */
  constructor () {
    const array = new Uint32Array(1)
    window && window.crypto && window.crypto.getRandomValues(array)

    super(array[0])
  }
}

// /**
//  * Uses the C++ rand function to generator a random number
//  * the idea of this is constant reboots across the web
//  * and with analytics so we can see the same moves and go
//  * with them
//  *
//  * @internal
//  * */
// class CPPRandom extends Random {
//   static new () {
//     return new CPPRandom()
//   }
//
//   constructor () {
//     super(Number.MAX_SAFE_INTEGER)
//
//     this[value] = random()
//   }
// }

/**
 * @param {Random} creator - One of the above random number generators
 * @param {number} sampleSize -
 * @param {number} sampleSeconds
 *
 * @private
 * */
function testDistribution (creator = SecureRandom.randomWithNegative(), sampleSize = 2000, sampleSeconds = 10) {
  var startTime = new Date().getTime()
  var endTime = startTime + (sampleSeconds * 1000)

  const buckets = new Float64Array(sampleSize)
  while (new Date().getTime() < endTime) {
    for (let i = 0; i < sampleSize; i++) {
      buckets[((creator.toNumber() % (sampleSize / 2)) + (sampleSize / 2))] += 1
    }
  }

  return buckets
}

module.exports = Random
// module.exports.CPPRandom = CPPRandom
module.exports.SecureRandom = SecureRandom

/**
 * @private
 * */
module.exports.$_testDistribution = testDistribution
