// TODO: finish flow annotations

import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import View from 'material-ui/svg-icons/action/view-module'

import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Navbar from 'react-bootstrap/lib/Navbar'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

const navbarStyle = {
  backgroundColor: 'transparent',
  border: '1px solid lightgrey',
  marginBottom: '0px',
  borderRadius: '0px',
  fontSize: '14px',
}

export type Props = {
  title: string,
  onViewChangeClick: Function,
  selectedValue: string,
  onCollapse?: Function,
};

class DiffHeader extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      notesCollapsed: false,
      selectedValue: props.selectedValue || '0',
      onViewChangeClick: props.onViewChangeClick,
    }
    this.handleChangeSingle = this.handleChangeSingle.bind(this)
    this.handleCollapseClick = this.handleCollapseClick.bind(this)
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  props: Props

  handleChangeSingle(event, value) {
    this.setState({
      selectedValue: value,
    })

    if (this.state.onViewChangeClick) {
      this.state.onViewChangeClick(value)
    }
  }

  handleCollapseClick() {
    this.setState({
      notesCollapsed: true,
    })

    if (this.props.onCollapse) {
      this.props.onCollapse(true)
    }
  }

  handleExpandClick() {
    this.setState({
      notesCollapsed: false,
    })

    if (this.props.onCollapse) {
      this.props.onCollapse(false)
    }
  }

  render() {
    const { title } = this.props

    return (
      <Navbar style={navbarStyle} fluid>
        <Nav>
          <NavItem>
            {title}
          </NavItem>
        </Nav>
        <Nav pullRight>
          {/* {comments &&
            <div>
              <IconButton
                tooltipPosition="top-left"
                tooltip="Expand inline all comments"
                disableTouchRipple
                onClick={this.handleExpandClick}
              >
                <MessageOpen />
              </IconButton>
              <IconButton
                tooltipPosition="top-left"
                tooltip="Collapse inline all comments"
                disableTouchRipple
                onClick={this.handleCollapseClick}
              >
                <MessageClose />
              </IconButton>
            </div>
          }*/}
          <IconMenu
            menuStyle={{ border: '1px solid lightgrey' }}
            iconButtonElement={<IconButton><View /></IconButton>}
            onChange={this.handleChangeSingle}
            value={this.state.selectedValue}
          >
            <MenuItem value="0" primaryText="Unified diff" />
            <MenuItem value="1" primaryText="Split diff" />
            <MenuItem value="2" primaryText="Raw view" />
          </IconMenu>
        </Nav>
      </Navbar>
    )
  }
}


export default DiffHeader
