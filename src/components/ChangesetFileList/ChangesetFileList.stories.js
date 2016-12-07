/* eslint-disable import/no-extraneous-dependencies */
/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ChangesetFileList from './ChangesetFileList'

const fixtureComments = [
  {
    id: '2',
    text: 'hi im a line comment',
    line: 'n2',
    created: '2016-12-07 15:35:56.335115',
    modified: '2016-12-07 15:35:56.335127',
    author: {
      username: 'admin',
      fullName: 'Kallithea Admin',
    },
  },
]

const filesFixture = [
  {
    name: 'Editor/Mono/EditorGUI.cs',
    comments: fixtureComments,
    stats: {
      added: 10,
      deleted: 0,
      binary: false,
    },
    id: 'C--04c6e90faac2',
    diff: 'diff ...',
    oldName: 'README.md',
    operation: 'M',
  },
  {
    name: 'Editor/Mono/GUI/GradientEditor.cs',
    comments: [],
    stats: {
      added: 10,
      deleted: 0,
      binary: true,
    },
    id: 'C--04c6e90faac3',
    diff: 'diff ...',
    oldName: 'README.md',
    operation: 'M',
  },
]

storiesOf('ChangesetFileList', module)
  .addDecorator(muiTheme())
  .add('compact', () => (
    <ChangesetFileList
      compact
      containerId={'foo'}
      files={filesFixture}
    />
  ))
