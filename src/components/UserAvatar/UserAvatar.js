/* @flow */
import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'

type Props = {
  src: ?string,
  style: ?Object,
}

function UserAvatar(props: Props) {
  return (
    <Avatar
      src={props.src}
      size={40}
      style={{ borderRadius: '20%', ...props.style }}
    />
  )
}

UserAvatar.propTypes = {
  src: PropTypes.string,
  style: PropTypes.object,
}

export default UserAvatar
