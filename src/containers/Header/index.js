/* @flow */

import React from 'react'
import { routes } from 'universal/constants'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import Badge from 'material-ui/Badge'

import Logout from '../Logout'
import SearchBox from 'components/SearchBox'
import './styles.css'

const badgeStyle = {
  padding: '10px 14px 12px 12px',
  margin: '6px 10px',
  fontSize: '18px',
  color: '#878a9f',
}

export type Props = {
  title?: string,
  showMenuIconButton?: boolean,
  dispatch?: Function,
  projectName?: string,
}

function Header(props: Props) {
  return (
    <div>
      <Navbar
        fluid style={{
          height: '59px',
          borderRadius: '0px',
          fontWeight: 700,
          marginBottom: '20px' }}
      >
        <Nav>
          <Badge
            badgeContent={1}
            secondary
            badgeStyle={{ width: '16px', height: '16px' }}
            style={badgeStyle}
          >
            <i className="fa fa-bell-o" aria-hidden="true" />
          </Badge>
        </Nav>
        <Nav>
          <Badge
            badgeContent={4}
            primary
            badgeStyle={{ width: '16px', height: '16px' }}
            style={badgeStyle}
          >
            <i className="fa fa-envelope-o" aria-hidden="true" />
          </Badge>
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
