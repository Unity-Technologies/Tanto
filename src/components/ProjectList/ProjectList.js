/* @flow */

import React from 'react'
import { List } from 'material-ui/List'
import ProjectItem from './ProjectItem'
import type { RepositoryType } from 'ducks/repositories'

export type Props = {
  projects: Array<RepositoryType>,
  clickHandler: Function,
}

function ProjectList(props: Props) {
  const { projects, clickHandler } = props
  return (
    <List
      style={{ paddingTop: 0, paddingBottom: 0 }}
      primaryTogglesNestedList
    >
      {
      projects.map(item =>
        <ProjectItem
          key={item.id}
          inset={0}
          project={item}
          clickHandler={clickHandler}
        />
        )
      }
    </List>
  )
}

export default ProjectList
