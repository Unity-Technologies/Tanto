/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ChangesetList from './ChangesetList.js'

storiesOf('ChangesetList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <ChangesetList
      data={[{
        hash: 'dsaijdsa',
      }]}
    />
  ))
