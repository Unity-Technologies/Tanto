import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import Open from 'material-ui/svg-icons/navigation/menu'
import TextField from 'material-ui/TextField'
import Search from 'material-ui/svg-icons/action/search'
import { KafkaBadge, MessageBadge, Logout } from 'components'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { OPEN_SIDE_BAR } from 'ducks/sidebar'

function NavBar({ appBarStyle, showMenuIconButton, dispatch }) {
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

NavBar.propTypes = {
  // title: PropTypes.string.isRequired,
  showMenuIconButton: PropTypes.bool.isRequired,
  appBarStyle: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(state => ({
  showMenuIconButton: state.sidebar.open,
}))(NavBar)
