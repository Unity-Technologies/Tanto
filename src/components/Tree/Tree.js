// TODO: add flow annotations

import React from 'react'
import _ from 'lodash'
import { List } from 'material-ui/List'

import TreeItem from './TreeItem'

function Tree(props) {
  const { data } = props
  return (
    <List
      style={{ paddingTop: 0, paddingBottom: 0 }}
      primaryTogglesNestedList
    >
      {data && data.length &&
      data.map(item =>
        <TreeItem
          key={_.uniqueId('_tree_item')}
          item={item}
          inset={0}
          {...props}
        />
        )
      }
    </List>
  )
}

export default Tree
