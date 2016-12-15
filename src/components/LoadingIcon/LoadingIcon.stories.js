/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import LoadingIcon from './index.js'

storiesOf('LoadingIcon', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <LoadingIcon />
  ))
