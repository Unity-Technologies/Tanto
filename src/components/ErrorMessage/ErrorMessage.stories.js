/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ErrorMessage from './index.js'

storiesOf('ErrorMessage', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <ErrorMessage text={'lorem ipsum'} />
  ))
