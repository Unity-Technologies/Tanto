/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import List from './index.js'

storiesOf('List', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <List />
  ))
