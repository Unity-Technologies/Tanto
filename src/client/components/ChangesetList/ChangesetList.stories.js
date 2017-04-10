/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ChangesetList from './ChangesetList.js'

const commitsList = [
  {
    id: 'db44c4f8399f',
    rawId: 'db44c4f8399f01e5d94c2dc608ddbf5bdbe256e7',
    branch: 'default',
    message: 'commit1',
    author: 'Kateryna Musina <kateryna@unity3d.com>',
    files: [
      {
        stats: {
          added: 3,
          deleted: 4,
        },
      },
    ],
    date: '2017-01-10 13:51:17',
    status: 'not_reviewed',
  },
  {
    id: '8f745f03f2ea',
    rawId: '8f745f03f2eacf942dbcc20b4e605fd5dba48a35',
    branch: 'default',
    message: 'commit2',
    author: 'Kateryna Musina <kateryna@unity3d.com>',
    files: [
      {
        stats: {
          added: 7,
          deleted: 0,
        },
      },
    ],
    date: '2017-01-10 13:51:45',
    status: 'not_reviewed',
  },
]

storiesOf('ChangesetList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <ChangesetList
      commits={commitsList}
    />
  ))
