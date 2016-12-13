/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import PullRequestList from './index.js'

storiesOf('PullRequestList', module)
  .addDecorator(muiTheme())
  .add('empty', () => (
    <PullRequestList
      items={[]}
      totalPagesCount={1}
      activePage={1}
      isFetching={false}
    />
  ))
  .add('fetching', () => (
    <PullRequestList
      items={[]}
      isFetching
    />
  ))
