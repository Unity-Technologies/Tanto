/* @flow */

import React from 'react'
import _ from 'lodash'
import { List } from 'material-ui/List'
import GroupItem from './GroupItem'
import type { GroupType } from 'ducks/projects'

export type Props = {
  data?: Array<GroupType>,
  clickHandler: Function,
}

const GroupList = (props : Props) => {
  const { data, clickHandler } = props
  return (
    <List
      style={{ paddingTop: 0, paddingBottom: 0 }}
      primaryTogglesNestedList
    >
      {data && data.length &&
        data.map(group =>
          <GroupItem
            key={group.id}
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
