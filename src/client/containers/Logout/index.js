/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import { setPersona } from 'ducks/session/actions'
import { getLoggedUserAvatar, getLoggedUsername, getPersona } from 'ducks/session/selectors'
import Avatar from 'components/Avatar'

import {
  GUARDIAN_PERSONA,
  DEVELOPER_PERSONA,
} from 'universal/constants'
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
    const { avatar, username, persona, logoutRoute } = this.props
    return (
      <div>
        <Avatar avatar={avatar} style={{ margin: '8px' }} />
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
          <MenuItem eventKey="1" onClick={() => this.changePersona(DEVELOPER_PERSONA)}>
            <div style={{ display: 'inline-block' }}>
              <div style={{ margin: '5px -9px', float: 'left' }}>
                {persona === DEVELOPER_PERSONA &&
                  <i className="fa fa-check" aria-hidden="true" />
                }
              </div>
              <div style={{ margin: '5px 15px' }}>Developer persona</div>
            </div>
          </MenuItem>
          <MenuItem eventKey="2" onClick={() => this.changePersona(GUARDIAN_PERSONA)}>
            <div style={{ display: 'inline-block' }}>
              <div style={{ margin: '5px -9px', float: 'left' }}>
                {persona === GUARDIAN_PERSONA &&
                  <i className="fa fa-check" aria-hidden="true" />
                }
              </div>
              <div style={{ margin: '5px 15px' }}>Guardian persona</div>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem disableTouchRipple value="3" primaryText="Settings" />
          <Divider />
          <MenuItem disableTouchRipple value="2" primaryText="Sign out" href={logoutRoute} />
        </IconMenu>
      </div>
    )
  }
}

export default connect(
  state => ({
    persona: getPersona(state),
    username: getLoggedUsername(state),
    avatar: getLoggedUserAvatar(state),
  })
)(Logout)
