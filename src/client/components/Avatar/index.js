/* @flow */

import React from 'react'
import { default as MaterialAvatar } from 'material-ui/Avatar'

export type Props = {
  style?: Object,
  avatar: string,
};

const avatarStyle = {
  borderRadius: '20%',
  float: 'left',
  display: 'table-column',
  height: '40px',
  width: '40px',
  color: 'rgba(157, 156, 156, 0.58)',
}

function Avatar(props: Props) {
  if (!props.avatar) {
    return (
      <div style={{ ...avatarStyle, padding: '7px 7px 7px 9px', backgroundColor: 'lightgrey' }} >
        <i className="fa fa-user-o fa-2x" aria-hidden="true"></i>
      </div>
    )
  }

  return (
    <MaterialAvatar
      src={props.avatar}
      size={40}
      style={{ ...avatarStyle, ...props.style }}
    />
  )
}

export default Avatar

