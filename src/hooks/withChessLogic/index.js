import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'

import Chess from 'chess.js'

import ChessLogicContext from '../../contexts/ChessLogicContext'

const withChessLogic = (Component) => {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  const propTypes = (Component.propTypes && Component.propTypes) || {}

  const ChessLogicProvider = memo(({ startingFen, ...rest }) => {
    /**
     * Seems to stop the bellow functions causing render issues
     * */
    const chess = useMemo(() => new Chess(startingFen && startingFen), [startingFen])

    return (
      <ChessLogicContext.Provider value={chess}>
        <Component {...rest} />
      </ChessLogicContext.Provider>
    )
  })

  ChessLogicProvider.displayName = 'ChessLogicProvider'

  ChessLogicProvider.propTypes = {
    ...propTypes,
    startingFen: PropTypes.string
  }

  return ChessLogicProvider
}

export default withChessLogic
