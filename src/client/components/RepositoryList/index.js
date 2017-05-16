/* @flow */

import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import { pureComponent } from 'components/PureComponent'
import _ from 'lodash'
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

export const RepositoryList = (props: Props) => {
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
            key={_.uniqueId('repositoryItem')}
            repository={item}
          />
        )
      }
    </ListGroup>
  )
}

export default pureComponent(RepositoryList)
