import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'

function UserAvatar(props) {
  return (
    <Avatar
      src={props.src}
      size={40}
      style={{ borderRadius: '20%' }}
    />
  )
}

UserAvatar.propTypes = {
  src: PropTypes.string.isRequired,
}

export default UserAvatar
