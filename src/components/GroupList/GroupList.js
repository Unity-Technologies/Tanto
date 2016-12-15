/* @flow */

import React from 'react'
import { List } from 'material-ui/List'
import GroupItem from './GroupItem'
import type { GroupType } from 'ducks/projects'

export type Props = {
  groups: Array<GroupType>,
  clickHandler: Function,
}

const GroupList = (props : Props) => {
  const { groups, clickHandler } = props
  return (
    <List
      style={{ paddingTop: 0, paddingBottom: 0 }}
      primaryTogglesNestedList
    >
      {
        groups.map(group =>
          <GroupItem
            key={group.name}
            inset={0}
            group={group}
            clickHandler={clickHandler}
          />
        )
      }
    </List>
  )
}

export default GroupList
