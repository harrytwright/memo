/**
 * withChess.js
 *
 * HOC for the chess context
 * */

import React from "react";

import useChess from "../useChess";

const withChess = (Component) => (props) => {
  const ctx = useChess()
  return <Component {...props} {...ctx} />
}

export default withChess
