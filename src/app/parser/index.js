/**
 * Take in the imported PGN and parser it to a more manageable
 * object, work through the children variations to get the moves.
 *
 * Move order is not important here since we're converting to a very
 * basic hash table to handle the move generation
 * */

import Chess from 'chess.js'
import pgnParser from 'pgn-parser'

import Move from './move'

export default function parser (pgn) {
  const parsedPGN = pgnParser.parse(pgn)[0]

  const game = new Chess()

  const moves = []

  const handleVariation = (mainLineMove, gameInProgress) => {
    // Lets not overwrite the main game
    const game = new Chess(gameInProgress.fen())
    const variation = mainLineMove.ravs

    variation.forEach((variation) => {
      const { moves: variationMoves } = variation

      variationMoves.forEach((move) => {
        if (move.ravs) handleVariation(move, game)

        const source = game.fen()
        const { san } = game.move(move.move, { sloppy: true })
        const parsedMove = new Move(san, game.fen(), source)
        moves.push(parsedMove)
      })
    })
  }

  parsedPGN.moves.forEach((move) => {
    if (move.ravs) handleVariation(move, game)

    const source = game.fen()
    const { san } = game.move(move.move, { sloppy: true })
    const parsedMove = new Move(san, game.fen(), source)
    moves.push(parsedMove)
  })

  return moves
}
