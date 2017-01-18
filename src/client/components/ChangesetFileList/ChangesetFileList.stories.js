/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ChangesetFileList from './ChangesetFileList'

const randInt = (max) => Math.floor((Math.random() * max))

const fixtureComment = () => (
  {
    id: '2',
    text: 'hi im a line comment',
    lineNumber: 'n2',
    created: '2016-12-07 15:35:56.335115',
    modified: '2016-12-07 15:35:56.335127',
    author: {
      username: 'admin',
      fullName: 'Kallithea Admin',
    },
  }
)

const fixtureFile = (name) => (
  {
    name,
    comments: Array(randInt(100)).map(fixtureComment),
    stats: {
      added: randInt(10),
      deleted: randInt(10),
      binary: randInt(10) > 8,
    },
    id: `C--${randInt(100000000000)}`,
    diff: 'diff ...',
    oldName: name,
    operation: 'M',
  }
)

const filesFixture = [
  'Editor/Mono/EditorGUI.cs',
  'Editor/Mono/GUI/GradientEditor.cs',
  'core/data/readme.rst',
  'core/data/list/list.cs',
  'database/tests/list_test.cs',
  'test/core/list/paper.cs',
  'test/database/list/paper.cs',
].map(fixtureFile)

storiesOf('ChangesetFileList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <ChangesetFileList
      compact={false}
      files={filesFixture}
    />
  ))
  .add('compact', () => (
    <ChangesetFileList
      compact
      files={filesFixture}
    />
  ))
