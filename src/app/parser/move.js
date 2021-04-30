/**
 * Hold the parsed move
 * */

class Move {
  constructor (san, fen, parent) {
    this.san = san
    this.to = fen
    this.from = parent
  }
}

module.exports = Move
