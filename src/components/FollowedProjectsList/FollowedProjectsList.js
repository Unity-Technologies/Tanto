export type Props = {};
/* eslint-disable max-len */

import React from 'react'
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router'
import _ from 'lodash'

const statusIcon = (value) => {
  let color = 'rgb(107, 127, 152)'
  if (value === 0) {
    color = '#51a458'
  } else if (value === 2) {
    color = '#d16d6d'
  }
  return (
    <div style={{ color, fontSize: '18px', padding: '20px' }}>
      {value === 1 &&
        <i className="fa fa-circle-o-notch fa-spin fa-fw" />
      }
      {value === 2 &&
        <i className="fa fa-exclamation-triangle" aria-hidden="true" />
      }
      {value === 0 &&
        <i className="fa fa-check" aria-hidden="true" />
      }
    </div>
  )
}

const projects = [
  { link: '/project/UmVwb3NpdG9yeTo1', title: 'Unity/Unity', description: 'Unity\'s development repository -- this contains development branches.', lastCommit: '1 minute', author: 'Grace Ng', status: 0 },
  { link: '/project/UmVwb3NpdG9yeTo1', title: 'katana/Buildmaster', description: 'Buildmaster configuration.', lastCommit: '5 minute', author: 'John Dou', status: 2 },
  { link: '/project/UmVwb3NpdG9yeTo1', title: 'users/hackweek-games/et-cars', description: 'Cars project @ ET teamweek 2015.', lastCommit: '1 day', author: 'Oleksiy', status: 1 },
  { link: '/project/UmVwb3NpdG9yeTo1', title: 'users/grace', description: 'Test sandbox.', lastCommit: '12 days', author: 'Grace Ng', status: 1 },
]
function FollowedProjectsList() {
  return (
    <List
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      {projects.map(item => (
        <ListItem
          key={_.uniqueId('project')}
          style={{ marginBottom: 0, fontWeight: 400 }}
          primaryText={<Link
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '14px',
            }}
            to={item.link}
          >{item.title}</Link>}
          secondaryText={
            <div style={{ fontSize: '12px' }}>
              <span style={{ color: '#5f5c5c' }}>
                last commit {item.lastCommit} ago from
                <span style={{ color: '#5f5c5c' }}> {item.author}</span>
              </span>
              <div>{item.description}</div>
            </div>
    }
          rightToggle={statusIcon(item.status)}
          secondaryTextLines={2}
        />
      ))}

    </List>
  )
}

export default FollowedProjectsList
