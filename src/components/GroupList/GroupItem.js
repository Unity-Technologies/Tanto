/* @flow */

import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'
import { ListItem } from 'material-ui/List'
import type { GroupType } from 'ducks/projects'

export type Props = {
  group: GroupType,
  inset: number,
  clickHandler?: Function,
}


class GroupItem extends Component {

  props: Props

  touchTapEventHandler = () => {
    if (this.props.clickHandler) {
      this.props.clickHandler(this.props.group.path)
    }
  }

  render() {
    const {
      group,
      inset,
    } = this.props

    const {
      name,
      description,
    } = group

    const primaryText = name
    const secondaryText = description || ''

    const listItemWithoutNestedStyle = {
      paddingLeft: `${inset}px`,
      fontSize: '16px',
    }

    return (
      <div>
        <ListItem
          key={name}
          style={listItemWithoutNestedStyle}
          onTouchTap={this.touchTapEventHandler}
          leftAvatar={<Avatar size={30} icon={<FileFolder />} />}
          primaryText={primaryText}
          secondaryText={secondaryText}
        />
        <Divider />
      </div>
    )
  }
}

export default GroupItem
