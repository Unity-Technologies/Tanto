/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import Settings from 'material-ui/svg-icons/action/settings'

import Icon from './Icon.js'

storiesOf('Icon', module)
  .addDecorator(muiTheme())
  .add('default settings', () => (
    <Icon icon={<Settings />} size={30} color={'grey'} backgroundColor={'white'} />
  ))
