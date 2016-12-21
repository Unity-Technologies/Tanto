/* @flow */

import React from 'react'
import { ListGroup } from 'react-bootstrap'
import RepositoryItem from './RepositoryItem'
import GroupItem from './GroupItem'
import type { RepositoryType } from './RepositoryItem'
export type { RepositoryType } from './RepositoryItem'
import type { GroupType } from './GroupItem'
export type { GroupType } from './GroupItem'

export type Props = {
  repositories: Array<RepositoryType>,
  groups: Array<GroupType>,
  path: string,
}

function RepositoryList(props: Props) {
  const { repositories, groups, path } = props
  return (
    <ListGroup>
      {
        groups.map(item =>
          <GroupItem
            path={path}
            group={item}
          />
        )
      }
      {
        repositories.map(item =>
          <RepositoryItem
            repository={item}
          />
        )
      }
    </ListGroup>
  )
}

export default RepositoryList
