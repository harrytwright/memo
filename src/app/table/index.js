import parser from '../parser'
import Zorbist from '../zorbist'
import handleFEN from '../logic'

import Node from './node'
import Table from './table'

export default class HashTable {
  constructor () {
    this.zorbist = new Zorbist()
    this.zorbist.initialise()

    this.initialised = false
    this._table = new Table()
  }

  /**
   * Loaders
   * */

  /**
   * Add the PGN to the table
   *
   * @param {Array<Move>|string} pgn - The pgn to be memorised
   * */
  addPGN (pgn) {
    if (typeof pgn === 'string') pgn = parser(pgn)

    // Should export the pgn above, and the starting FEN
    this._table = new Table(pgn)
    this.initialised = true

    pgn.forEach((move) => {
      this.hashMove(move)
    })
  }

  /**
   * Internals
   * */

  /**
   * Hash and create the move to place in the table
   *
   * @param {Move} move
   *
   * @private
   * */
  hashMove (move) {
    const parent = this.getOrCreate(move.from, true)
    // const current = this.get(move.to, true)

    if (!parent.moves) {
      parent.moves = []
    }

    parent.moves.push(move.san)
  }

  /**
   * Gets
   * */

  /**
   * Get or Create the moves for the position from the FEN
   *
   * @param {String} fen - FEN for the position
   * @param {Boolean} createIfNull - Create the node if it doesn't exist
   * @return {Node}
   *
   * @private
   * */
  getOrCreate (fen, createIfNull) {
    const { positions, castling, whiteToMove, enPassant } = handleFEN(fen)
    const targetHash = this.zorbist.hash(positions, enPassant, castling, whiteToMove)

    let node = this._table.table.get(targetHash)
    if (!node && createIfNull) {
      node = new Node(simplifiedFen(fen))
      this._table.table.set(targetHash, node)
    }

    return node
  }

  /**
   * Get the moves for the position from the FEN
   *
   * @param {String} fen - FEN for the position
   * @return {Node}
   * */
  get (fen) {
    return this.getOrCreate(fen, false)
  }
}

/**
 * Remove ply's
 * */
function simplifiedFen (fen) {
  const fenComponents = fen.split(' ')
  if (fenComponents.length <= 4) {
    return fen
  }
  return `${fenComponents[0]} ${fenComponents[1]} ${fenComponents[2]} ${fenComponents[3]}`
}
