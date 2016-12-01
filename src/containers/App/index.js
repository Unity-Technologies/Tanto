// TODO: add flow annotations

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { SideBar, Header } from '../../components'

// TODO: these should be configurable:
const APP_NAME = 'Tanto'
const APP_THEME = 'cyan'


const theme = require(`../../theme/ui/${APP_THEME}`)
const muiTheme = getMuiTheme(theme)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sideBarWidth: 280,
      hiddenSideBarWidth: 60,
    }
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        theme,
      })
    )
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
                {childrenWithProps}
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
}

export default connect(state => ({
  open: state.sidebar.open,
}))(App)
