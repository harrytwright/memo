/**
 * Place for the hashing constants
 * */

const constants = module.exports = {}

/**
 * @param {Number} length
 *
 * @return {Array<Number>}
 * */
const FilledArray = (length) => new Array(length).fill(0)

constants.initialBoard = FilledArray(2)
  .map(() => FilledArray(6)
    .map(() => FilledArray(64)))

constants.initialEnPassant = FilledArray(8)

constants.initialCastle = FilledArray(4)

constants.indices = {
  pawn: 0,
  rook: 1,
  knight: 2,
  bishop: 3,
  queen: 4,
  king: 5
}

constants.colors = {
  white: 0,
  black: 1
}
