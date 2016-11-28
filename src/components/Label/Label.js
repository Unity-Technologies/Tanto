/* @flow */

import React, { PropTypes } from 'react'

function Label(props) {
  const { text, color, prefix } = props
  const style = {
    backgroundColor: color || '#ffffff',
    fontSize: '14px',
    padding: '2px 6px',
    color: '#636161',
    border: '1px solid #cecdcd',
    borderRadius: '3px',
    fontWeight: 300,
  }
  return (
    <span style={style}>
      {!!prefix && <span>{prefix} </span>}
      <strong>{text}</strong>
    </span>
  )
}

Label.propTypes = {
  text: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Label
