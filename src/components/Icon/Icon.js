export type Props = {
  icon?: number | string | React.Element | Array<any>,
  size?: number,
  color?: string,
  backgroundColor?: string,
  style?: Object,
};

/* eslint-disable */

import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'

function Icon(props) {
  const { icon, size, color, backgroundColor, style } = props
  const defaultStyle = { borderRadius: 0 }
  return (
    <Avatar
      size={size}
      color={color}
      backgroundColor={backgroundColor || 'transparent'}
      icon={icon}
      style={style || defaultStyle}
    />
  )
}

export default Icon
