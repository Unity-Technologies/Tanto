/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { storiesOf } from '@kadira/storybook'

import RepositoryItem from './index'

const repository = {
  name: 'Some-Repository',
  description: 'Testing out the list item',
  id: '5',
  owner: { fullName: 'William Sprent' },
  updated: '2016-12-09 10:00:12.250926',
}
storiesOf('RepositoryItem', module)
  .add('default', () => (
    <RepositoryItem
      repository={repository}
    />
  ))
