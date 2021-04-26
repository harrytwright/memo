/**
 * ChessProvider.js
 *
 * This is the game state management, from here any child hooks/containers can
 * access the state of the game, and see the last moves
 *
 * */
import React, { useState, useMemo, useCallback } from "react";

import Chess from 'chess.js'

import ChessContext from "../../contexts/ChessContext";

const fullTurnName = (colour) => colour === 'w' ? 'white' : 'black'

/**
 * The chess game state management, maybe a little redundant but will work here.
 * */
const ChessProvider = ({ children, defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' }) => {
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
  const handleMove = useCallback((sanOrOrig, dest) => {
    let moveObj
    if(dest) {
      moveObj = { from: sanOrOrig, to: dest, promotion: 'q'}
    } else {
      moveObj = sanOrOrig
    }

    let move = game.move(moveObj)
    setState({ fen: game.fen(), lastMove: move })
  }, [game])

  /**
   * Just a helper function to get the full name of the turn color
   * */
  const turnColor = () => {
    fullTurnName(game.turn())
  }

  return (
    <ChessContext.Provider value={{ fen: state.fen, lastMove: state.lastMove, move: handleMove, turnColor, game }}>
      {children}
    </ChessContext.Provider>
  )
}

export default ChessProvider
