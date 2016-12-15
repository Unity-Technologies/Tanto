/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ProjectItem from './ProjectItem'

const project = {
  name: 'Some-Repository',
  description: 'Testing out the list item',
  id: '5',
  owner: { fullName: 'William Sprent' },
  updatedTime: '2016-12-09 10:00:12.250926',
}
storiesOf('ProjectItem', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <ProjectItem
      project={project}
      inset={10}
      clickHandler={action('go')}
    />
  ))
