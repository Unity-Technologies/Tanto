/* @flow */

import React, { PropTypes } from 'react'
import { Link as RouterLink } from 'react-router'

function Link(props) {
  const defaultStyle = {
    fontSize: '14px',
    color: 'rgb(92, 92, 92)',
    textDecoration: 'none',
    cursor: 'pointer',
  }
  const { style, to, label } = props

  return (
    <RouterLink style={style || defaultStyle} to={to}>{label}</RouterLink>
  )
}

Link.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default Link
