import React, { PropTypes } from 'react'
import _ from 'lodash'
import { List } from 'material-ui/List'
import ProjectItem from './ProjectItem'

function ProjectList(props) {
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

ProjectList.propTypes = {
  data: PropTypes.array.isRequired,
}

export default ProjectList
