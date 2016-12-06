/* @flow */

import React from 'react'
import _ from 'lodash'
import { List } from 'material-ui/List'
import ProjectItem from './ProjectItem'

export type Props = {
  data?: Array<any>
}

function ProjectList(props: Props) {
  const { data } = props
  return (
    <List
      style={{ paddingTop: 0, paddingBottom: 0 }}
      primaryTogglesNestedList
    >
      {data && data.length &&
        data.map(item =>
          <ProjectItem
            key={_.uniqueId('_project_item')}
            item={item}
            inset={0}
            {...props}
          />
        )
      }
    </List>
  )
}

export default ProjectList
