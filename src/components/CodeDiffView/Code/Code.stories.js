/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Code from './Code.js'

storiesOf('Code', module)
  .addDecorator(muiTheme())
  .add('collapse comments', () => (
    <Code
      type={'type'}
      diff={'>>> diff'}
      comments={[]}
      collapseComments
    />
  ))
