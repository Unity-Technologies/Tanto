/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Expander from './Expander.js'

storiesOf('Expander', module)
  .add('default', () => (
    <Expander>
      <h1>Content</h1>
    </Expander>
  ))
