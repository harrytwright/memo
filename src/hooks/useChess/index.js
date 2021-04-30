/**
 * useChess.js
 *
 * A more in depth look for the chess context, that allows for manipulating the game
 * that comes from `ChessLogicContext`
 * */

import { useCallback, useMemo, useState } from 'react'

import useChessLogic from '../useChessLogic'

const fullTurnName = (colour) => colour === 'w' ? 'white' : 'black'

const useChess = () => {
  const game = useChessLogic()

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
