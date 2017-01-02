/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import UserAvatar from './UserAvatar.js'

storiesOf('UserAvatar', module)
  .addDecorator(muiTheme())
  .add('no source', () => (
    <UserAvatar src={null} />
  ))
