/* @flow */

import React, { PropTypes, Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Divider from 'material-ui/Divider'
import { ListItem } from 'material-ui/List'

const subHeader = text => (
  <div
    style={{ color: '#8c8c8c', fontSize: '14px' }}
  >
    {text}
  </div>
)

class ProjectItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      followed: false,
    }
    this.toggleOpen = this.toggleOpen.bind(this)
    this.toggleFollow = this.toggleFollow.bind(this)
  }

  getTimeAgo(then) {
    const now = Date.now()
    let diff = Math.floor((now - then) / 1000)

    if (Math.floor(diff / 60) === 0) {
      return `${diff} seconds ago`
    }
    diff = Math.floor(diff / 60)
    if (Math.floor(diff / 60) === 0) {
      return '${diff} minutes ago'
    }
    diff = Math.floor(diff / 60)
    if (Math.floor(diff / 24) === 0) {
      return `${diff} hours ago`
    }
    diff = Math.floor(diff / 24)
    return `${diff} days ago`
  }

  toggleOpen() {
    const value = this.state.open
    this.setState({ open: !value })
  }

  toggleFollow() {
    const value = this.state.followed
    this.setState({ followed: !value })
  }

  render() {
    const {
      item,
      primaryTextProp,
      secondaryTextProp,
      valueProp,
      clickHandler,
      updated,
      owner,
      inset,
    } = this.props

    const primaryText = item[primaryTextProp]
    const secondaryText = secondaryTextProp ? item[secondaryTextProp] : ''
    const value = item[valueProp]
    const ownerName = item[owner].first_name + ' ' + item.owner.last_name // eslint-disable-line
    const updatedTime = item[updated]
    // TODO: something else
    const diff = this.getTimeAgo(new Date(updatedTime))

    const listItemWithoutNestedStyle = {
      paddingLeft: `${inset}px`,
      fontSize: '14px',
    }

    return (
      <div>
        <ListItem
          disableTouchRipple
          style={listItemWithoutNestedStyle}
          onTouchTap={() => clickHandler(value)}
          value={value}
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
                <div style={{ fontStyle: 'bold', fontSize: '18px', color: '#666666' }}>
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

ProjectItem.propTypes = {
  item: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
  childrenProp: PropTypes.string.isRequired,
  primaryTextProp: PropTypes.string.isRequired,
  secondaryTextProp: PropTypes.string,
  updated: PropTypes.string,
  owner: PropTypes.string,
  inset: PropTypes.number,
  valueProp: PropTypes.string.isRequired,
}

export default ProjectItem
