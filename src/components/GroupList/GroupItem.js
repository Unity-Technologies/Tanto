/* @flow */

/* eslint-disable */

import React, { PropTypes, Component } from 'react'
import _ from 'lodash'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'
import { ListItem } from 'material-ui/List'

const subHeader = text => (
  <div
    style={{ color: '#8c8c8c', fontSize: '13px' }}
  >
    {text}
  </div>
)

class GroupItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      followed: false,
    }
    this.toggleOpen = this.toggleOpen.bind(this)
    this.toggleFollow = this.toggleFollow.bind(this)
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
      childrenProp,
      primaryTextProp,
      secondaryTextProp,
      valueProp,
      clickHandler,
      inset,
    } = this.props

    const primaryText = item[primaryTextProp] || 'test'
    const secondaryText = secondaryTextProp ? item[secondaryTextProp] : ''
    const value = item[valueProp]
    const children = item[childrenProp]


    return (
      <div>
        <ListItem
          value={value}
          onTouchTap={() => clickHandler(value)}
          leftAvatar={<Avatar icon={<FileFolder />} />}
          primaryText={primaryText}
        />
        <Divider />
      </div>)
  }
}

GroupItem.propTypes = {
  item: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
  childrenProp: PropTypes.string.isRequired,
  primaryTextProp: PropTypes.string.isRequired,
  secondaryTextProp: PropTypes.string,
  // updated: PropTypes.string,
  // owner: PropTypes.string,
  inset: PropTypes.number,
  valueProp: PropTypes.string.isRequired,
}

export default GroupItem
