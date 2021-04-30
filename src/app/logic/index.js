/**
 * Create very basic bit mask for the position via FEN, will look to make this
 * more JS friendly rather than from a basic engine
 * */

const enPassantMasks = [
  0x101010101010101, 0x202020202020202, 0x404040404040404, 0x808080808080808,
  0x1010101010101010, 0x2020202020202020, 0x4040404040404040, 0x8080808080808080
]

/**
 * @param {string} fen - FEN string for the position
 * */
const handleFEN = (fen) => {
  const positions = {
    whitePawn: 0, whiteRook: 0, whiteKnight: 0, whiteBishop: 0, whiteQueen: 0, whiteKing: 0, blackPawn: 0, blackRook: 0, blackKnight: 0, blackBishop: 0, blackQueen: 0, blackKing: 0
  }

  const castling = {
    whiteKingSide: false,
    whiteQueenSide: false,
    blackKingSide: false,
    blackQueenSide: false
  }

  var charIndex = 0
  var boardIndex = 0

  while (fen.charAt(charIndex) !== ' ') {
    switch (fen.charAt(charIndex++)) {
      case 'P':
        positions.whitePawn |= (1 << boardIndex++)
        break
      case 'p':
        positions.blackPawn |= (1 << boardIndex++)
        break
      case 'R':
        positions.whiteRook |= (1 << boardIndex++)
        break
      case 'r':
        positions.blackRook |= (1 << boardIndex++)
        break
      case 'N':
        positions.whiteKnight |= (1 << boardIndex++)
        break
      case 'n':
        positions.blackKnight |= (1 << boardIndex++)
        break
      case 'B':
        positions.whiteBishop |= (1 << boardIndex++)
        break
      case 'b':
        positions.blackBishop |= (1 << boardIndex++)
        break
      case 'Q':
        positions.whiteQueen |= (1 << boardIndex++)
        break
      case 'q':
        positions.blackQueen |= (1 << boardIndex++)
        break
      case 'K':
        positions.whiteKing |= (1 << boardIndex++)
        break
      case 'k':
        positions.blackKing |= (1 << boardIndex++)
        break
      case '/':
        break
      case '1':
        boardIndex++
        break
      case '2':
        boardIndex += 2
        break
      case '3':
        boardIndex += 3
        break
      case '4':
        boardIndex += 4
        break
      case '5':
        boardIndex += 5
        break
      case '6':
        boardIndex += 6
        break
      case '7':
        boardIndex += 7
        break
      case '8':
        boardIndex += 8
        break
      default:
        break
    }
  }

  const whiteToMove = fen.charAt(++charIndex) === 'w'

  charIndex += 2
  while (fen.charAt(charIndex) !== ' ') {
    switch (fen.charAt(charIndex++)) {
      case 'K':
        castling.whiteKingSide = true
        break
      case 'Q':
        castling.whiteQueenSide = true
        break
      case 'k':
        castling.blackKingSide = true
        break
      case 'q':
        castling.blackQueenSide = true
        break
      default:
        break
    }
  }

  let enPassant = null
  if (fen.charAt(charIndex + 1) !== '-') {
    enPassant = enPassantMasks[parseInt(fen.charAt(charIndex + 2))]
  }

  return {
    positions,
    castling,
    whiteToMove,
    enPassant
  }
}

export default handleFEN
export { enPassantMasks }
