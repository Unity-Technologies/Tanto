/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import LoginForm from './index.js'

storiesOf('LoginForm', module)
  .add('default', () => (
    <LoginForm />
  ))
