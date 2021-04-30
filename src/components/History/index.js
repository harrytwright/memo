/**
 * Simple table to hold the PGN history
 *
 * Style similar to lichesses for now
 * */

import clsx from 'clsx'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Wrapper from './Wrapper'
import { TableView, Index, Move } from './components'

/**
 *
 * */
const History = ({ history, selected, onSelect = () => {} }) => {
  if (!selected) selected = history.length

  // Since this comes in as one giant array just split it here
  const chunkedArray = history.reduce((all, one, i) => {
    const ch = Math.floor(i / 2)
    all[ch] = [].concat((all[ch] || []), one)
    return all
  }, [])

  return (
    <Wrapper>
      <TableView>
        {chunkedArray.map((chunk, idx) => {
          // We need to deal with half moves later, so get the original index here
          const mv = (idx * 2)
          return (
            <Fragment key={idx}>
              <Index>{idx + 1}</Index>
              {chunk.map((el, idx) => {
                // Make the ply here by adding the index on + 1 so the ply != there index of
                // history (May change this based on how select works)
                const ply = mv + (idx + 1)
                return <Move className={clsx((ply === selected) && 'active')} key={ply} onClick={onSelect}>{el.san}</Move>
              })}
            </Fragment>
          )
        })}
      </TableView>
    </Wrapper>
  )
}

History.propTypes = {
  onClick: PropTypes.func,
  history: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.oneOf(['w', 'b']),
    from: PropTypes.string,
    to: PropTypes.string,
    flags: PropTypes.string,
    san: PropTypes.string,
    captured: PropTypes.string
  })),
  selected: PropTypes.string
}

export default History
