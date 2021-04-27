/***/

import { useState, useMemo, useCallback, useEffect, useReducer } from 'react'

import useEngine from '../useEngine'

const initialState = {
  loaded: false,
  search: null,
  move: null,
  ready: false,
  score: null
}

function reducer (state, action) {
  console.log(action)

  switch (action.type) {
    case 'loaded':
      return { ...state, loaded: true }
    case 'ready':
      return { ...state, ready: true }
    case 'search':
      return { ...state, search: 'Depth: ' + action.match[1] + ' Nps: ' + action.match[2] }
    case 'move':
      return { ...state, move: { from: action.match[1], to: action.match[2], promotion: action.match[3] } }
    case 'score':
      return { ...state, score: action.score }
    default:
      throw new Error()
  }
}

const useStockfish = (startpos, game, onBestMove, fen, color ) => {
  const [status, dispatch] = useReducer(reducer, initialState)

  const [engine, send] = useEngine()

  engine.onmessage = (event) => {
    let line

    if (event && typeof event === 'object') {
      line = event.data
    } else {
      line = event
    }

    if (line === 'uciok') {
      dispatch({ type: 'loaded' })
    } else if (line === 'readyok') {
      dispatch({ type: 'ready' })
    } else {
      let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/)

      // match && dispatch({})
      if (match) {
        match && dispatch({ type: 'move', match })
        onBestMove({ from: match[1], to: match[2], promotion: match[3] })
      } else if ((match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))) {
        dispatch({ type: 'search', match })
      }

      if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
        const score = parseInt(match[2], 10) * (game.turn() === 'w' ? 1 : -1)
        /// Is it measuring in centipawns?
        if (match[1] === 'cp') {
          dispatch({ type: 'score', score: (score / 100.0).toFixed(2) })
          /// Did it find a mate?
        } else if (match[1] === 'mate') {
          dispatch({ type: 'score', score: 'Mate in ' + Math.abs(score) })
        }

        /// Is the score bounded?
        if ((match = line.match(/\b(upper|lower)bound\b/))) {
          dispatch({
            type: 'score',
            score: ((match[1] === 'upper') === (game.turn() === 'w')
              ? '<= '
              : '>= ') + status.score
          })
        }
      }
    }
  }

  const getMoves = useCallback(() => {
    let moves = ''
    const history = game.history({ verbose: true })

    for (let i = 0; i < history.length; ++i) {
      const move = history[i]
      moves +=
        ' ' + move.from + move.to + (move.promotion ? move.promotion : '')
    }

    return moves
  }, [fen, game])

  const prepareMove = useCallback((depth = 9) => {
    const turn = game.turn() === 'w' ? 'white' : 'black'
    if (!game.game_over()) {
      if (turn === color) {
        send(`position fen ${game.fen()} ${game.fen() !== startpos ? `moves ${getMoves()}` : ''}`)
        send(`go ${depth ? `depth ${depth}` : ''}`)
      }
    }
  }, [game, startpos, color, send, getMoves])

  useEffect(() => {
    if (status.loaded) return
    send('uci')
    send('ucinewgame')
    send('isready')
    prepareMove(9)
  })

  return useMemo(() => [prepareMove], [prepareMove]);
}

export default useStockfish
