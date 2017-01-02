/* @flow */

import React from 'react'
import { storiesOf } from '@kadira/storybook'

import GroupItem from './index'

const group = {
  name: 'SomeGroup',
  description: 'Some group description',
}
storiesOf('GroupItem', module)
  .add('default', () => (
    <GroupItem
      group={group}
      path={'/projects/groups'}
    />
  ))
