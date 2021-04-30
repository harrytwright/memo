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

const History = ({ history, selected, onSelect = () => {} }) => {
  if (!selected) selected = history.length

  const chunkedArray = history.reduce((all, one, i) => {
    const ch = Math.floor(i / 2)
    all[ch] = [].concat((all[ch] || []), one)
    return all
  }, [])

  return (
    <Wrapper>
      <TableView>
        {chunkedArray.map((chunk, idx) => {
          const mv = (idx * 2)
          return (
            <Fragment key={idx}>
              <Index>{idx + 1}</Index>
              {chunk.map((el, idx) => {
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
