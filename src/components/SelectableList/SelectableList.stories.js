/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import SelectableList from './SelectableList.js'

storiesOf('SelectableList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <SelectableList />
  ))
