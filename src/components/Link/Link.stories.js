/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Link from './Link.js'

storiesOf('Link', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Link
      label={'home'}
      to={'/'}
    />
  ))
