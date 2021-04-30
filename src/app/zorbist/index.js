/**
 * Very simple Zorbist hashing, using a mix of https://en.wikipedia.org/wiki/Zobrist_hashing and
 * https://www.youtube.com/watch?v=gyLCFfrLGIM to achieve, for now will stay this way, but have an
 * idea using objects to maybe make this easier and a better output
 * */

import { SecureRandom } from '../../utils/random'
import handleFen from '../logic'

import { initialCastle, initialBoard, initialEnPassant, indices, colors } from './constants'

export default class Zorbist {
  constructor () {
    this.board = initialBoard
    this.enPassant = initialEnPassant
    this.castle = initialCastle
    this.blackMove = undefined
  }

  /**
   * Not the best but its the algorithmic
   *
   * Can take it's time and not be 100% secure since
   * it is only needed on start up
   * */
  initialise () {
    // colors
    for (let i = 0; i < 2; i++) {
      // pieces
      for (let j = 0; j < 6; j++) {
        // Squares
        for (let k = 0; k < 64; k++) {
          this.board[i][j][k] = SecureRandom.randomWithNegative().toNumber()
        }
      }
    }

    for (let i = 0; i < 8; i++) {
      this.enPassant[i] = SecureRandom.randomWithNegative().toNumber()
    }

    for (let i = 0; i < 4; i++) {
      this.castle[i] = SecureRandom.randomWithNegative().toNumber()
    }

    this.blackMove = SecureRandom.randomWithNegative().toNumber()

    return this
  }

  /**
   * Will work this better.
   *
   * They are ordered, from left to right from the A file, w/ pawn first
   * */
  hash (pieces, enPassant, castling, whiteToMove) {
    const {
      whitePawn, whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, blackPawn, blackRook, blackKnight, blackBishop, blackQueen, blackKing
    } = pieces

    const {
      whiteKingSide,
      whiteQueenSide,
      blackKingSide,
      blackQueenSide
    } = castling

    var zReturnKey = 0

    /**
     * Can maybe do this better too
     * */
    for (let square = 0; square < 64; square++) {
      if (((whitePawn >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.white][indices.pawn][square]
      } else if (((blackPawn >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.black][indices.pawn][square]
      } else if (((whiteRook >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.white][indices.rook][square]
      } else if (((blackRook >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.black][indices.rook][square]
      } else if (((whiteKnight >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.white][indices.knight][square]
      } else if (((blackKnight >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.black][indices.knight][square]
      } else if (((whiteBishop >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.white][indices.bishop][square]
      } else if (((blackBishop >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.black][indices.bishop][square]
      } else if (((whiteQueen >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.white][indices.queen][square]
      } else if (((blackQueen >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.black][indices.queen][square]
      } else if (((whiteKing >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.white][indices.king][square]
      } else if (((blackKing >> square) & 1) === 1) {
        zReturnKey ^= this.board[colors.black][indices.king][square]
      }
    }

    // Watch this as i'm not sure the best way to describe this
    for (let column = 0; column < 8; column++) {
      if (enPassant === handleFen.enPassantMasks[column]) {
        zReturnKey ^= this.enPassant[column]
      }
    }

    if (whiteKingSide) zReturnKey ^= this.castle[0]
    if (whiteQueenSide) zReturnKey ^= this.castle[1]
    if (blackKingSide) zReturnKey ^= this.castle[2]
    if (blackQueenSide) zReturnKey ^= this.castle[3]

    if (!whiteToMove) zReturnKey ^= this.blackMove

    return zReturnKey
  }
}
