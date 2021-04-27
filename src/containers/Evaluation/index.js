/**
 * Evaluation/Analysis page for the app
 * */

import React, { useEffect, useCallback, useState } from 'react'

import Chessground from '../Chessground'

import useChess from '../../hooks/useChess'
import useEngine from '../../hooks/useEngine'
import useStockfish from '../../hooks/useStockfish'

const Evaluation = ({ fen: startingFen, playerColor = 'white', ...rest }) => {
  const { fen, lastMove, handleMove: handleLogic, handleMovable, turnColor, game } = useChess(startingFen)

  const onBestMove = useCallback(({ from, to, promotion }) => {
    handleLogic(from, to, promotion)
    whiteMove()
    blackMove()
  }, [handleLogic, whiteMove, blackMove])

  var [whiteMove] = useStockfish(startingFen, game, onBestMove, fen, 'white')
  var [blackMove] = useStockfish(startingFen, game, onBestMove, fen, 'black')
  // handleBestMove((move) => console.log(move))

  // const handleMove = useCallback((...args) => {
  //   console.log(handleLogic)
  //   handleLogic(...args)
  //   prepareMove()
  // }, [prepareMove, handleLogic])

  // engine.onmessage = (event) => console.log(event)
  // evaler.onmessage = (event) => console.log(event)
  //
  // const getMoves = useCallback(() => {
  //   let moves = "";
  //   let history = game.history({ verbose: true });
  //
  //   for (let i = 0; i < history.length; ++i) {
  //     let move = history[i];
  //     moves +=
  //       " " + move.from + move.to + (move.promotion ? move.promotion : "");
  //   }
  //
  //   return moves;
  // }, [game])
  //
  // const prepareMove = useCallback((depth) => {
  //   const turn = turnColor()
  //   if (!game.game_over()) {
  //     if (turn !== playerColor) {
  //       send(`position fen ${fen} ${fen !== startingFen ?  `moves ${getMoves()}` : ''}`);
  //       send(`go ${depth ? `depth ${depth}` : ''}`)
  //     }
  //   }
  // }, [fen, game, getMoves, playerColor, send, sendEval, turnColor])
  //
  // const lastMoveArray = lastMove ? [lastMove.from, lastMove.to] : null
  //
  // useEffect(() => {
  //   if (engineState !== ENGINE_STATE.loaded) return
  //   setEngineState(ENGINE_STATE.starting)
  //   send('uci')
  //   send('ucinewgame')
  //   send("isready");
  //   send('position fen ' + startingFen)
  //   send('go depth 9')
  //   prepareMove(9)
  // }, [engineState, startingFen]);
  //
  // useEffect(() => {
  //   prepareMove(9)
  //   sendEval(`position fen ${fen} ${fen !== startingFen ?  `moves ${getMoves()}` : ''}`);
  //   sendEval("eval");
  // }, [fen, prepareMove, ])

  const lastMoveArray = lastMove ? [lastMove.from, lastMove.to] : null

  return (
    <Chessground fen={fen} onMove={handleLogic} lastMove={lastMoveArray} turnColor={turnColor()}
                 draggable={{ showGhosts: true }} movable={handleMovable('analysis', playerColor)} />
  )
}

export default Evaluation
