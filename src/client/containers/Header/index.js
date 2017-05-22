/* @flow */

import React from 'react'
import { pureComponent } from 'components/PureComponent'
import { routes } from 'universal/constants'
import { connect } from 'react-redux'

import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import { NavItem } from 'react-bootstrap'
import Open from 'material-ui/svg-icons/navigation/menu'
import Logout from '../Logout'
import { TOGGLE_SIDE_BAR } from 'ducks/sidebar'
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
          <NavItem onClick={() => props.dispatch({ type: TOGGLE_SIDE_BAR })}>
            <Open />
          </NavItem>
        </Nav>
        <Nav pullRight>
          <Logout logoutRoute={routes.ONO_AUTH_LOGOUT_ROUTE} />
        </Nav>
      </Navbar>
    </div >
  )
}

export default connect(state => ({
  showMenuIconButton: state.sidebar.open,
}))(pureComponent(Header))
