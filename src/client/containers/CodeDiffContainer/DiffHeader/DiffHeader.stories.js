/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import DiffHeader from './DiffHeader.js'

storiesOf('DiffHeader', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <DiffHeader
      title={'Lorem ipsum'}
      onViewChangeClick={() => action('onViewChangeClick')}
      onCollapse={() => action('onCollapse')}
      selectedValue={'foo'}
    />
  ))
