/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import LinkButton from './LinkButton.js'

storiesOf('LinkButton', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <LinkButton
      label={'foo'}
      to={'/'}
    />
  ))
