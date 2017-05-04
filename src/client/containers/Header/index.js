/* @flow */

import React from 'react'
import { routes } from 'universal/constants'
import { connect } from 'react-redux'
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import IconButton from 'material-ui/IconButton'
import Open from 'material-ui/svg-icons/navigation/menu'
import Logout from '../Logout'
import { TOGGLE_SIDE_BAR } from 'ducks/sidebar'
import SearchBox from 'components/SearchBox'
import './styles.css'

export type Props = {
  showMenuIconButton?: boolean,
  dispatch: Function
}

function Header(props: Props) {
  return (
    <div>
      <Navbar
        fluid style={{
          height: '59px',
          borderRadius: '0px',
          fontWeight: 700,
          marginBottom: '20px',
        }}
      >
        <Nav>
          <IconButton
            style={{ margin: '5px' }}
            disableTouchRipple
            iconStyle={{ fill: 'hsla(220, 13%, 49%, 0.98)' }}
            onClick={() => props.dispatch({ type: TOGGLE_SIDE_BAR })}
          >
            <Open />
          </IconButton>
        </Nav>
        <Nav pullRight>
          <Nav style={{ paddingTop: '7px' }}>
            <SearchBox />
          </Nav>
          <Nav>
            <Logout logoutRoute={routes.ONO_AUTH_LOGOUT_ROUTE} />
          </Nav>
        </Nav>
      </Navbar>
    </div>
  )
}

export default connect(state => ({
  showMenuIconButton: state.sidebar.open,
}))(Header)
