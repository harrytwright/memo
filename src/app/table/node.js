/**
 * A node is a stored value of a played position.
 *
 * This only holds the basic FEN value, and the
 * available moves that have been preselected by
 * the PGN loaded
 * */

export default class Node {
  constructor (fen) {
    this.fen = fen
  }
}
