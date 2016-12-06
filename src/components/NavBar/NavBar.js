/* @flow */

import React from 'react'
import AppBar from 'material-ui/AppBar'
import Open from 'material-ui/svg-icons/navigation/menu'
import TextField from 'material-ui/TextField'
import Search from 'material-ui/svg-icons/action/search'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'

import KafkaBadge from '../KafkaBadge/KafkaBadge'
import MessageBadge from '../MessageBadge/MessageBadge'
import Logout from '../Logout'
import { OPEN_SIDE_BAR } from 'ducks/sidebar'

export type Props = {
  showMenuIconButton: boolean,
  appBarStyle?: Object,
  dispatch: Function,
}

function NavBar({ appBarStyle, showMenuIconButton, dispatch }: Props) {
  const searchStyle = {
    width: '40px',
    margin: '0 10px',
    paddingTop: '12px',
    height: '100%',
    fill: '#dcdbdb',
  }
  return (
    <AppBar
      style={appBarStyle}
      showMenuIconButton={!showMenuIconButton}
      iconElementLeft={<IconButton
        style={{ float: 'left', padding: '0 30px' }}
        iconStyle={{ fill: 'rgb(220, 219, 219)' }}
        onClick={() => dispatch({ type: OPEN_SIDE_BAR })}
      >
        <Open />
      </IconButton>
      }
      title={
        <div style={{ marginLeft: 'auto' }}>
          <div style={{ float: 'left' }}>
            <Search
              style={searchStyle}
            />
          </div>
          <TextField
            style={{ marginTop: '9px', width: '200px' }}
            underlineShow={false}
            hintText="Search"
          />
        </div>
      }
    >
      <MessageBadge />
      <KafkaBadge />
      <Logout />
    </AppBar>)
}

export default connect(state => ({
  showMenuIconButton: state.sidebar.open,
}))(NavBar)
