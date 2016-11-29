/* @flow */

import React, { PropTypes } from 'react'
import _ from 'lodash'
import { List } from 'material-ui/List'
import GroupItem from './GroupItem'

function GroupList(props) {
  const { data } = props
  return (
    <List
      style={{ paddingTop: 0, paddingBottom: 0 }}
      primaryTogglesNestedList
    >
      {data && data.length &&
        data.map(item =>
          <GroupItem
            key={_.uniqueId('_group_item')}
            item={item}
            inset={0}
            {...props}
          />
        )
      }
    </List>
  )
}

GroupList.propTypes = {
  data: PropTypes.array.isRequired,
}

export default GroupList
