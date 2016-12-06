export type Props = {
  persona?: string,
  username?: string,
  logoutRoute?: string,
};

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import { TestAvatar } from 'components'

import {
  GUARDIAN_PERSONA,
  DEVELOPER_PERSONA,
  MANAGER_PERSONA,
  changePersona,
} from 'ducks/session'
import More from 'material-ui/svg-icons/navigation/more-vert'

function Logout(props) {
  const { username, persona, logoutRoute } = props
  return (
    <div>
      <TestAvatar
        style={{ margin: '8px' }}
      />
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
        <MenuItem eventKey="1" onClick={() => changePersona(DEVELOPER_PERSONA)}>
          <div style={{ display: 'inline-block' }}>
            <div style={{ margin: '5px -9px', float: 'left' }}>
              {persona === DEVELOPER_PERSONA &&
                <i className="fa fa-check" aria-hidden="true" />
              }
            </div>
            <div style={{ margin: '5px 15px' }}>Developer persona</div>
          </div>
        </MenuItem>
        <MenuItem eventKey="2" onClick={() => changePersona(GUARDIAN_PERSONA)}>
          <div style={{ display: 'inline-block' }}>
            <div style={{ margin: '5px -9px', float: 'left' }}>
              {persona === GUARDIAN_PERSONA &&
                <i className="fa fa-check" aria-hidden="true" />
              }
            </div>
            <div style={{ margin: '5px 15px' }}>Guardian persona</div>
          </div>
        </MenuItem>
        <MenuItem eventKey="3" onClick={() => changePersona(MANAGER_PERSONA)}>
          <div style={{ display: 'inline-block' }}>
            <div style={{ margin: '5px -9px', float: 'left' }}>
              {persona === MANAGER_PERSONA &&
                <i className="fa fa-check" aria-hidden="true" />
              }
            </div>
            <div style={{ margin: '5px 15px' }}>Manager persona</div>
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

export default connect(
  state => ({
    persona: state.session.persona,
    username: state.session.profile.username || '',
  }), { changePersona }
)(Logout)
