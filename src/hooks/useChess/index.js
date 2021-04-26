/**
 * useChess.js
 *
 * Hook for the chess context
 * */

import { useContext } from 'react'

import ChessContext from '../../contexts/ChessContext'

const useChess = () => {
  const ctx = useContext(ChessContext)
  if (!ctx) throw new Error('This component is not a child of ChessContext.Provider')
  return ctx
}

export default useChess
