// TODO: finish flow annotations

import React, { Component } from 'react'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Navbar from 'react-bootstrap/lib/Navbar'
import ChangesetDelta from 'components/ChangesetDelta'

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
  collapsed: boolean,
  collapsedComments: boolean,
  onCollapse?: Function,
  onCollapseComments?: Function,
}


class DiffHeader extends Component {
  props: Props

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
      </Navbar>
    )
  }
}


export default DiffHeader
