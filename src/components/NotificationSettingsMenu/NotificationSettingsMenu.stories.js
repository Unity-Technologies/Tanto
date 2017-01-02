/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import NotificationSettingsMenu from './NotificationSettingsMenu.js'

storiesOf('NotificationSettingsMenu', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <NotificationSettingsMenu />
  ))
