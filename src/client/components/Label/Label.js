/* @flow */

import React from 'react'

export type Props = {
  text: string,
  prefix?: string,
  color?: string,
}

function Label(props: Props) {
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

export default Label
