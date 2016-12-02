/* @flow */

import React, { PropTypes, Component } from 'react'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'
import { ListItem } from 'material-ui/List'

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
      primaryTextProp,
      secondaryTextProp,
      valueProp,
      clickHandler,
    } = this.props

    const primaryText = item[primaryTextProp] || 'test'
    const secondaryText = secondaryTextProp ? item[secondaryTextProp] : ''
    const value = item[valueProp]

    return (
      <div>
        <ListItem
          value={value}
          onTouchTap={() => clickHandler(value)}
          leftAvatar={<Avatar size={30} icon={<FileFolder />} />}
          primaryText={primaryText}
          secondaryText={secondaryText}
        />
        <Divider />
      </div>
    )
  }
}

GroupItem.propTypes = {
  item: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
  childrenProp: PropTypes.string.isRequired,
  primaryTextProp: PropTypes.string.isRequired,
  secondaryTextProp: PropTypes.string,
  valueProp: PropTypes.string.isRequired,
}

export default GroupItem
