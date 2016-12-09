/* @flow */
/* eslint-disable */

import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Divider from 'material-ui/Divider'
import { ListItem } from 'material-ui/List'
import type { ProjectType } from 'ducks/projects'

const subHeader = text => (
  <div
    style={{ color: '#8c8c8c', fontSize: '14px' }}
  >
    {text}
  </div>
)

type Props = {
  clickHandler: Function,
  inset: number,
  project: ProjectType,
}

class ProjectItem extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
      followed: false,
    }
    this.touchTapEventHandler = this.touchTapEventHandler.bind(this)
  }

  props: Props

  state: {
    open: boolean,
    followed: boolean,
  }

  toggleOpen() {
    const value = this.state.open
    this.setState({ open: !value })
  }

  toggleFollow() {
    const value = this.state.followed
    this.setState({ followed: !value })
  }

  touchTapEventHandler() {
    if (this.props.clickHandler) {
      this.props.clickHandler(this.props.project.id)
    }
  } 

  render() {
    const {
      project,
      inset,
      clickHandler,
    } = this.props

    const {
      owner,
      name,
      description,
      id,
      updatedTime,
    } = project

    const ownerName = owner.fullName
    const primaryText = name
    const secondaryText = description || ''
    const diff = moment(updatedTime).fromNow()

    const listItemWithoutNestedStyle = {
      paddingLeft: `${inset}px`,
      fontSize: '14px',
    }

    return (
      <div>
        <ListItem
          key={id}
          disableTouchRipple
          style={listItemWithoutNestedStyle}
          onTouchTap={this.touchTapEventHandler}
          value={id}
          rightIconButton={
            <div
              style={{
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '35px',
                cursor: 'pointer',
                color: this.state.followed ? 'rgb(37, 146, 106)' : '#aebac0' }}
            >
              <i
                className="fa fa-rss"
                onClick={this.toggleFollow}
                aria-hidden="true"
              />
            </div>
            }
          primaryText={
            <Row>
              <Col md={4}>
                <div style={{ fontStyle: 'bold', fontSize: '16px', color: '#666666' }}>
                           {primaryText}
                </div>
                <span style={{ fontStyle: 'italic', fontSize: '13px', color: '#8a8a88' }}>
                            {secondaryText}
                </span>
              </Col>
              <Col md={4}>
                      {subHeader('Owner:')}
                <div style={{ color: '#4e4a4a' }}>{ownerName}</div>
              </Col>
              <Col md={4}>
                      {subHeader('Last update:')}
                <div style={{ color: '#4e4a4a' }}>
                  {diff}
                </div>
              </Col>
            </Row>
                      }
        />
        <Divider />
      </div>)
  }
}

export default ProjectItem
