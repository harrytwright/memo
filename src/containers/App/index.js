/**
 * Main page for the app
 * */

import React, { useState, useCallback } from 'react'

import History from '../../components/History'
import Chessground from "../../components/Chessground";
import styled from "styled-components";

const history = [
  { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
  { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
  { color: 'w', from: 'f2', to: 'f4', flags: 'b', piece: 'p', san: 'f4' },
  { color: 'b', from: 'e5', to: 'f4', flags: 'c', piece: 'p', captured: 'p', san: 'exf4' }
]

const Wrapper = styled.div`
  font-family: Lato,serif;
  width: 780px;
  margin: 64px auto;
  
  display: flex;
  
  & > * {
    margin-right: 16px;
  }
  
  & > *:last-child {
    margin-right: 0;
  }
`

//  fen='8/1BP2p2/6r1/1r1RP3/K1n3Pp/2Pp4/1q2Q3/7k w - - 0 1'
export default function App () {
  return (
    <Wrapper>
      <Chessground fen={'rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3'} />
      <History history={history} selected={4} />
    </Wrapper>
  )
}
