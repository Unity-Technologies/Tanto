/* @flow */

import React from 'react'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { Link } from 'react-router-dom'

export type GroupType = {
  name: string,
  description: ?string,
}

type Props = {
  group: GroupType,
  path: string,
}

function GroupItem(props: Props) {
  const { group, path } = props

  return (
    <ListGroupItem style={{ display: 'flex' }}>
      <div style={{ fontSize: '16px', color: '#95b3ea' }}>
        <i className="fa fa-folder" aria-hidden="true"></i>
      </div>
      <div style={{ display: 'table' }}>
        <div style={{ paddingLeft: '10px', display: 'table' }}>
          <Link to={`${path}/${group.name}`}>{group.name}</Link>
          <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
            {group.description}
          </div>
        </div>
      </div>
    </ListGroupItem>
  )
}

export default GroupItem
