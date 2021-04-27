/**
 * useChess.js
 *
 * Hook for the chess context
 * */

import React, { useCallback, useMemo, useState } from 'react'
// import PropTypes from 'prop-types'
import Chess from 'chess.js'

// import ChessContext from '../../contexts/ChessContext'

let hasWarned = false

const fullTurnName = (colour) => colour === 'w' ? 'white' : 'black'

const useChess = (defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', variant) => {
  /**
   * Seems to stop the bellow functions causing render issues
   * */
  const game = useMemo(() => Chess(defaultFen), [defaultFen])

  /**
   * Most important data to hold, the rest can be deciphered from the game object itself
   *
   * Mainly here to force re-rendering
   * */
  const [state, setState] = useState({
    fen: game.fen(),
    lastMove: null
  })

  /**
   * Handle the move, should allow for both UCI moves, and board moves via chessground
   * */
  const handleMove = useCallback((sanOrOrig, dest, promotion = 'q') => {
    let moveObj
    if (dest) {
      moveObj = { from: sanOrOrig, to: dest, promotion }
    } else {
      moveObj = sanOrOrig
    }

    const move = game.move(moveObj)
    setState({ fen: game.fen(), lastMove: move })
  }, [game])

  /**
   * Just a helper function to get the full name of the turn color
   * */
  const turnColor = useCallback(() => fullTurnName(game.turn()), [game])

  /**
   * @param mode - The game mode to play
   * @param player - The player color
   * */
  const handleMovable = useCallback((mode = 'analysis', player = 'white') => {
    const dests = new Map()
    game.SQUARES.forEach(s => {
      const ms = game.moves({ square: s, verbose: true })
      if (ms.length) dests.set(s, ms.map(m => m.to))
    })

    return {
      free: false,
      dests,
      color: mode === 'analysis' ? turnColor() : player
    }
  }, [game, turnColor])

  if (!!variant && !hasWarned) {
    console.warn('Variants have not be set up just yet')
    hasWarned = true
  }

  return useMemo(() => ({
    fen: state.fen,
    lastMove: state.lastMove,
    handleMove,
    handleMovable,
    turnColor,
    game
  }), [state, game, handleMove, handleMovable, turnColor])
}

export default useChess
