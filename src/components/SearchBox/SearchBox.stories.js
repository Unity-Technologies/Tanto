/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import SearchBox from './SearchBox.js'

storiesOf('SearchBox', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <SearchBox />
  ))
