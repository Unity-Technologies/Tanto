/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Header from './index.js'

storiesOf('Header', module)
  .add('default', () => (
    <Header />
  ))
