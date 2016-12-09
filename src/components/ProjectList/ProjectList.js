/* @flow */

import React from 'react'
import _ from 'lodash'
import { List } from 'material-ui/List'
import ProjectItem from './ProjectItem'
import type { ProjectType } from 'ducks/projects'

export type Props = {
  data?: Array<ProjectType>,
  clickHandler: Function,
}

function ProjectList(props: Props) {
  const { data, clickHandler } = props
  return (
    <List
      style={{ paddingTop: 0, paddingBottom: 0 }}
      primaryTogglesNestedList
    >
      {data &&
        data.map(item =>
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
