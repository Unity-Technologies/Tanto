/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import ReduxBreadcrumb from './ReduxBreadcrumb.js'

storiesOf('ReduxBreadcrumb', module)
  .add('default', () => (
    <ReduxBreadcrumb />
  ))
