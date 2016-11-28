/* @flow */

import React, { PropTypes } from 'react'
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

Tree.propTypes = {
  data: PropTypes.array.isRequired,
  //clickHandler: PropTypes.func.isRequired,
  //childrenProp: PropTypes.string.isRequired,
 // primaryTextProp: PropTypes.string.isRequired,
  //secondaryTextProp: PropTypes.string,
  //inset: PropTypes.number,
  //valueProp: PropTypes.string.isRequired,
}

export default Tree
