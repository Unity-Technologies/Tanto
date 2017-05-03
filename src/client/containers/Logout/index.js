/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import { setPersona } from 'ducks/session/actions'
import { getLoggedUserAvatar, getLoggedUsername } from 'ducks/session/selectors'
import Avatar from 'components/Avatar'

/* @flow */
import More from 'material-ui/svg-icons/navigation/more-vert'

export type Props = {
  persona: string,
  avatar: string,
  username: string,
  logoutRoute: string,
  dispatch: Function
}


class Logout extends Component {
  changePersona = (persona) => {
    this.props.dispatch(setPersona(persona))
  }
  props: Props
  render() {
    const { avatar, username, logoutRoute } = this.props
    return (
      <div>
        <Avatar avatar={avatar} style={{ margin: '8px 15px' }} />
        <div
          style={{
            float: 'left',
            fontSize: '14px',
            marginTop: '17px',
          }}
        >
          {username}
        </div>
        <IconMenu
          iconButtonElement={
            <IconButton style={{ height: '58px', width: '58px' }}>
              <More />
            </IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          menuStyle={{ border: '1px solid lightgrey' }}
        >
          <MenuItem disableTouchRipple value="2" primaryText="Sign out" href={logoutRoute} />
        </IconMenu>
      </div>
    )
  }
}

export default connect(
  state => ({
    username: getLoggedUsername(state),
    avatar: getLoggedUserAvatar(state),
  })
)(Logout)
