/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Breadcrumb from './index'

storiesOf('Breadcrumb', module)
  .add('default', () => (
    <Breadcrumb
      path="/path/test/next"
    />
  ))
  .add('empty path', () => (
    <Breadcrumb
      path=""
    />
  ))
  .add('skip', () => (
    <Breadcrumb
      path="/path/test/next"
      skip={1}
    />
  ))

