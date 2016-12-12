/* @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'

export type Props = {
  icon?: number | string | React.Element<any> | Array<any>,
  size?: number,
  color?: string,
  backgroundColor?: string,
  style?: Object,
};

function Icon(props: Props) {
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
