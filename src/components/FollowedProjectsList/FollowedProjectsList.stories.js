/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import FollowedProjectsList from './FollowedProjectsList.js'

storiesOf('FollowedProjectsList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <FollowedProjectsList />
  ))
