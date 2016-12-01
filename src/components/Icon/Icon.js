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

Icon.propTypes = {
  icon: PropTypes.node.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
}

export default Icon
