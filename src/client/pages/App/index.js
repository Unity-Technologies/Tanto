// TODO: add flow annotations

import React from 'react'
import PureComponent from 'components/PureComponent'
import { connect } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from 'containers/Header'
import SideBar from 'containers/SideBar'

// TODO: these should be configurable:
const APP_NAME = 'Tanto'
const APP_THEME = 'cyan'

// FIXME
const theme = require(`../../theme/ui/${APP_THEME}`) //eslint-disable-line

const muiTheme = getMuiTheme(theme)

export type Props = {
  children: Object,
  open: boolean,
};

class App extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = {
      sideBarWidth: 280,
      hiddenSideBarWidth: 60,
    }
  }

  props: Props

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        theme,
      }),
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

export default connect(state => ({
  open: state.sidebar.open,
}))(App)
