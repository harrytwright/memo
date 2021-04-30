export default class Table {
  constructor (pgn, fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    this.table = new Map([])
    this.startFen = fen
    this.$_pgn = pgn
  }
}
