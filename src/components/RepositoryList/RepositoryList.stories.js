/* @flow */

import React from 'react'
import { storiesOf } from '@kadira/storybook'

import RepositoryList from './index'

const repos = [
  {
    name: 'Some-Repository1',
    description: 'Testing out the list item',
    id: '1',
    owner: { fullName: 'William Sprent' },
    updated: '2016-12-09 10:00:12.250926',
  },
  {
    name: 'Some-Repository2',
    description: 'Testing out the list item2',
    id: '2',
    owner: { fullName: 'William Sprent' },
    updated: '2016-12-09 10:00:12.250926',
  },
  {
    name: 'Some-Repository3',
    description: 'Testing out the list item3',
    id: '3',
    owner: { fullName: 'William Sprent' },
    updated: '2016-12-09 10:00:12.250926',
  },
]

const groups = [
  {
    name: 'SomeGroup1',
    description: 'Some group description1',
  },
  {
    name: 'SomeGroup2',
    description: 'Some group description2',
  },
  {
    name: 'SomeGroup3',
    description: 'Some group description3',
  },
]
storiesOf('RepositoryList', module)
  .add('default', () => (
    <RepositoryList
      repositories={repos}
      groups={groups}
      path="/projects/path"
    />
  ))
