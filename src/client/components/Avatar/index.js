/* @flow */

import React from 'react'
import { default as MaterialAvatar } from 'material-ui/Avatar' // eslint-disable-line
import { pureComponent } from 'components/PureComponent'

export type Props = {
  style?: Object,
  avatar: string,
};

const avatarStyle = {
  borderRadius: '10%',
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
        <i className="fa fa-user-o fa-2x" />
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

Avatar.defaultProps = {
  style: null,
}

export default pureComponent(Avatar)

