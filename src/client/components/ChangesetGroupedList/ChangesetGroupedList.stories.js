/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ChangesetGroupedList from './ChangesetGroupedList.js'

const dataFixture = [
  { version: '1',
    commits: [{
      id: 'db44c4f8399f',
      rawId: 'db44c4f8399f01e5d94c2dc608ddbf5bdbe256e7',
      branch: 'default',
      message: 'commit1',
      author: 'Kateryna Musina <kateryna@unity3d.com>',
      files: [
        {
          stats: {
            added: 0,
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
      }],
  },
  {
    version: '2',
    commits: [
      {
        id: 'bc14d578b6f5',
        rawId: 'bc14d578b6f52171ab6571dfc6d8e18c398d83a1',
        branch: 'feature1',
        message: 'feature',
        author: 'Kateryna Musina <kateryna@unity3d.com>',
        files: [
          {
            stats: {
              added: 6,
              deleted: 9,
            },
          },
        ],
        date: '2017-01-10 13:52:30',
        status: 'not_reviewed',
      }],
  },
]

storiesOf('ChangesetGroupedList', module)
  .addDecorator(muiTheme())
  .add('accordion', () => (
    <ChangesetGroupedList
      groups={dataFixture}
      accordion
    />
  ))
  .add('no accordion', () => (
    <ChangesetGroupedList
      groups={dataFixture}
      accordion={false}
    />
  ))
  .add('no commits', () => (
    <ChangesetGroupedList
      groups={[{ version: '1', commits: [] }, { version: '2', commits: [] }]}
      accordion={false}
    />
  ))
  .add('empty', () => (
    <ChangesetGroupedList
      groups={[]}
      accordion={false}
    />
  ))
