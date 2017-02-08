/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import CommentsList from './CommentsList.js'

storiesOf('CommentsList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <CommentsList
      comments={[
        { date: '2016-08-15 20:31:23', message: 'lorem ipsum', author: { slack: { avatar: '' } } },
        { date: '2016-08-10 20:31:23', message: 'lorem ipsum' },
      ]}
    />
  ))
