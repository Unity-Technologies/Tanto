/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Divider from './Divider.js'

storiesOf('Divider', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Divider text={'lorem ipsum'} />
  ))
