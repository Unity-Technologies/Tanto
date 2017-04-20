// TODO: add flow annotations

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from 'containers/Header'
import SideBar from 'containers/SideBar'
import { withRouter, Switch } from 'react-router-dom'

import Home from 'pages/Home'
import Repos from 'pages/Repos'

import { fetchProfile } from 'ducks/session/actions'
import { fetchUsers } from 'ducks/users'
import { setSideBarToDefault,
         clearSideBarSubItems } from 'ducks/sidebar'

// TODO: these should be configurable:
const APP_NAME = 'Tanto'
const APP_THEME = 'cyan'


const theme = require(`../../theme/ui/${APP_THEME}`)
const muiTheme = getMuiTheme(theme)

export type Props = {
  children: Object,
  open: boolean,
  dispatch: Function,
}

class App extends Component {
  constructor(props: Props) {
    super(props)
    props.dispatch(fetchProfile())
    props.dispatch(fetchUsers())
    props.dispatch(setSideBarToDefault())
    props.dispatch(clearSideBarSubItems())
    this.state = {
      sideBarWidth: 280,
      hiddenSideBarWidth: 60,
    }
  }

  props: Props

  render() {
    const { open } = this.props

    const openStyle = {
      marginLeft: this.state.sideBarWidth,
    }

    const closeStyle = {
      marginLeft: this.state.hiddenSideBarWidth,
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div>
            <SideBar
              title={APP_NAME}
              width={this.state.sideBarWidth}
              hiddenWidth={this.state.hiddenSideBarWidth}
              {...theme.componentStyles}
            />
            <div style={open ? openStyle : closeStyle} >
              <Header title={APP_NAME} />
              <div style={{ padding: '0px 20px' }}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/home" component={Home} />
                  <Route path="/repos/:path([a-zA-Z0-9\-]+)*" component={Repos} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(connect(state => ({
  open: state.sidebar.open,
}))(App))
