/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ChangesetGroupedList from './ChangesetGroupedList.js'

const dataFixture = [
  {
    data: [{
      hash: '382791',
    }],
    version: 'a version',
    date: 'today',
  },
  {
    data: [],
    version: 'another version',
    date: 'yesterday',
  },
]

storiesOf('ChangesetGroupedList', module)
  .addDecorator(muiTheme())
  .add('accordian', () => (
    <ChangesetGroupedList
      data={dataFixture}
      accordian
    />
  ))
