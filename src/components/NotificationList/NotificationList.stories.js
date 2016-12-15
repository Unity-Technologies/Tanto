/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import NotificationList from './NotificationList.js'

storiesOf('NotificationList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <NotificationList />
  ))
