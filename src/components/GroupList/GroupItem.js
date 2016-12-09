/* @flow */

import React from 'react'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'
import { ListItem } from 'material-ui/List'
import type { GroupType } from 'ducks/projects'

export type Props = {
  group: GroupType,
  inset: number,
  clickHandler: Function,
}


const GroupItem = (props : Props) => {
  const {
    group,
    clickHandler,
    inset,
  } = props

  const {
    name,
    description,
    id,
  } = group

  function touchTapEventHandler() {
    if (clickHandler) {
      clickHandler(name)
    }
  }

  const primaryText = name
  const secondaryText = description || ''
  const value = id

  const listItemWithoutNestedStyle = {
    paddingLeft: `${inset}px`,
    fontSize: '16px',
  }

  return (
    <div>
      <ListItem
        key={name}
        value={value}
        style={listItemWithoutNestedStyle}
        onTouchTap={touchTapEventHandler}
        leftAvatar={<Avatar size={30} icon={<FileFolder />} />}
        primaryText={primaryText}
        secondaryText={secondaryText}
      />
      <Divider />
    </div>
  )
}

export default GroupItem
