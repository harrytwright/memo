import { useContext } from 'react'

import ChessLogicContext from '../../contexts/ChessLogicContext'

const useChessLogic = () => {
  const context = useContext(ChessLogicContext)
  if (!context) throw new Error('Invalid hierarchy')
  return context
}

export default useChessLogic
