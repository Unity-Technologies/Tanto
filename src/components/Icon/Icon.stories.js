/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Icon from './Icon.js'

storiesOf('Icon', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Icon />
  ))
