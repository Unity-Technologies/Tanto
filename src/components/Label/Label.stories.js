/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Label from './Label.js'

storiesOf('Label', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Label text={'lorem ipsum'} />
  ))
  .add('custom prefix', () => (
    <Label text={'lorem ipsum'} prefix={'-'} />
  ))
  .add('custom color', () => (
    <Label text={'lorem ipsum'} color={'#333'} />
  ))
