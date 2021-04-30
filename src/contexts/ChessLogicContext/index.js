/**
 * This context will hold the game in play, be it just analysis or a game
 * so all children can access it
 * */
import { createContext } from 'react'

const ChessLogicContext = createContext(null)

export default ChessLogicContext
