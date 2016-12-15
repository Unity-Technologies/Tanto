/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ProjectList from './ProjectList'


const itemList = [
  {
    name: 'Some-Repository',
    description: 'Testing out the list item',
    id: '5',
    owner: { fullName: 'William Sprent' },
    inset: 10,
    updated: '2016-12-09 10:00:12.250926',
  },
  {
    name: 'Some-Other-Repository',
    description: 'Testing out the list item',
    id: '5',
    owner: { fullName: 'William Sprent' },
    inset: 10,
    updated: '2016-11-09 10:00:12.250926',
  },
]

storiesOf('ProjectList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <ProjectList
      projects={itemList}
      clickHandler={action('go')}
    />
  ))
