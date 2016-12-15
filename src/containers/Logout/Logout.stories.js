/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Logout from './index.js'

storiesOf('Logout', module)
  .add('default', () => (
    <Logout />
  ))
