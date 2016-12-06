/* @flow */

import React from 'react'
import { Link as RouterLink } from 'react-router'

export type Props = {
  style?: Object,
  label?: string,
  to?: string,
};

function Link(props: Props) {
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

export default Link
