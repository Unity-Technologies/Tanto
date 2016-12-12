/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import DropDown from './DropDown.js'

storiesOf('DropDown', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <DropDown />
  ))
