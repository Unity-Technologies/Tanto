/* eslint-disable import/no-extraneous-dependencies */
/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ChangesetFileList from './ChangesetFileList'

const fixtureComments = [
  {
    id: 'comment1',
    message: 'foo bar',
  },
  {
    id: 'comment1',
    message: 'foo bar baz',
  },
]

const filesFixture = [
  {
    name: 'Editor/Mono/EditorGUI.cs',
    comments: fixtureComments,
  },
  {
    name: 'Editor/Mono/GUI/GradientEditor.cs',
    comments: [],
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
