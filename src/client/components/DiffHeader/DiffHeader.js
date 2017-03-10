// TODO: finish flow annotations

import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import View from 'material-ui/svg-icons/action/view-module'

import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Navbar from 'react-bootstrap/lib/Navbar'
import ChangesetDelta from 'components/ChangesetDelta'
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
  stats: {
    added: number,
    deleted: number
  },
  onViewChangeClick: Function,
  selectedValue: string,
  collapsed: boolean,
  collapsedComments: boolean,
  onCollapse?: Function,
  onCollapseComments?: Function,
}


class DiffHeader extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      selectedValue: props.selectedValue || '0',
      onViewChangeClick: props.onViewChangeClick,
    }
  }

  props: Props

  handleChangeSingle = (event, value) => {
    this.setState({
      selectedValue: value,
    })

    if (this.state.onViewChangeClick) {
      this.state.onViewChangeClick(value)
    }
  }

  handleCommentsCollapseClick = (value: boolean) => {
    if (this.props.onCollapse) {
      this.props.onCollapseComments(value)
    }
  }

  handleDiffCollapseClick = (value: boolean) => {
    if (this.props.onCollapse) {
      this.props.onCollapse(value)
    }
  }

  render() {
    const { title, stats } = this.props

    return (
      <Navbar style={navbarStyle} fluid>
        <Nav>
          <NavItem>
            <div>
              <div onClick={this.handleDiffCollapseClick}>
              {!this.props.collapsed && <div onMouseDown={() => this.handleDiffCollapseClick(true)}>
                <i className="fa fa-minus" aria-hidden="true"></i>
              </div>}
              {this.props.collapsed &&
                <div onMouseDown={() => this.handleDiffCollapseClick(false)}>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </div>}
              </div>

            </div>
          </NavItem>
          <NavItem>
            <div style={{ width: '150px', display: 'flex' }}>
              <div
                style={{ float: 'left', width: '120px', marginTop: '2px', marginRight: '5px' }}
              >
                <ChangesetDelta {...stats} /></div>
              <div>{title}</div>
            </div>
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
