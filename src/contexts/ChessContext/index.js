/**
 * ChessContext.js
 *
 * Create a context to hold the game details, all fen data should be held here
 *
 * @note: This is an idea here
 * */

import { createContext } from 'react'

const ChessContext = createContext({
  game: null
})

export default ChessContext
