/**
 * Stockfish UCI parser hook
 *
 * This should be generic in-case we switch what engine is being used
 * */

import { useCallback, useMemo } from 'react'

/**
 * Message handler from the engine
 *
 * @callback StockfishMessageHandler
 * @param {string} line - The UCI response
 * */

/**
 * The UCI command for the engine
 *
 * @typedef {String} UCICommand
 * */

/**
 *
 * */
const useEngine = () => {
  const engine = useMemo(() => window.STOCKFISH(), [])

  /**
   * Send a UCI command to the engine
   *
   * @param {UCICommand} command
   * */
  const send = useCallback((command) => {
    engine.postMessage(command)
  }, [engine])

  // /**
  //  * Handle the response from the engine
  //  *
  //  * @param {StockfishMessageHandler} callback
  //  * */
  // const handleMessage = useCallback((callback) => {
  //   engine.onmessage = callback
  // }, [engine])

  // /**
  //  * A fake engine object to just change the way Stockfish response is handled
  //  * */
  // const ngin = {
  //   /**
  //    * @param {Function} callback
  //    * */
  //   onMessage: handleMessage
  // }

  return [engine, send]
}

export default useEngine
