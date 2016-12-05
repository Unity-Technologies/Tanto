/* eslint-disable import/no-extraneous-dependencies */
/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ChangesetDelta from './ChangesetDelta'

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

storiesOf('ChangesetDelta', module)
  .addDecorator(muiTheme())
  .add('details for half deletion/addition', () => (
    <ChangesetDelta
      deleted={5}
      added={5}
      changed={0}
      showDetails
    />
  ))
  .add('details for deleted', () => (
    <ChangesetDelta
      deleted={1}
      added={0}
      changed={0}
      showDetails
    />
  ))
  .add('details with equal changes', () => (
    <ChangesetDelta
      deleted={3}
      added={3}
      changed={3}
      showDetails
    />
  ))
  .add('without details', () => (
    <ChangesetDelta
      deleted={1}
      added={1}
      changed={1}
      showDetails={false}
    />
  ))
