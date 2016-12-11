/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import SideBar from './SideBar.js'

storiesOf('SideBar', module)
  .add('default', () => (
    <SideBar />
  ))
