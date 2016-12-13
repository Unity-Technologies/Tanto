/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import GroupList from './GroupList'


const itemList = [
  {
    name: 'Some-Repository',
    description: 'Testing out the list item',
    id: '5',
  },
  {
    name: 'Some-Other-Repository',
    description: 'Testing out the list item',
    id: '5',
  },
]

storiesOf('GroupList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <GroupList
      groups={itemList}
      clickHandler={action}
    />
  ))
