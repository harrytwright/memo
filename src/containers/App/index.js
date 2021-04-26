/**
 * Main page for the app
 * */

import React, { useContext, useCallback } from 'react'

import ChessProvider from '../ChessProvider'

import withChess from "../../hooks/withChess";

const TestConsumer = withChess(({ move, game }) => {
  // const { fen, move, game } = useC(ChessContext)

  const handleClick = useCallback(() => {
    const moves = game.moves({ verbose: true })
    const { san } = moves[Math.floor(Math.random() * moves.length)]
    move(san)
  }, [move, game])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button style={{ marginBottom: '16px' }} onClick={handleClick}>Move</button>
      <span style={{ width: '100%' }}>{game.pgn()}</span>
    </div>
  )
})

//  fen='8/1BP2p2/6r1/1r1RP3/K1n3Pp/2Pp4/1q2Q3/7k w - - 0 1'
export default function App () {
  return (
    <div style={{ width: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
      <ChessProvider defaultFen='8/1BP2p2/6r1/1r1RP3/K1n3Pp/2Pp4/1q2Q3/7k w - - 0 1' variant='chess960'>
        <TestConsumer />
      </ChessProvider>
    </div>
  )
}
