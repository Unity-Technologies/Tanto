/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Comment from './Comment.js'

storiesOf('Comment', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <div>
      <Comment
        loggedUsername={'test_user'}
        simpleText
        comment={{
          id: '1',
          text: 'I am a comment',
          created: '2017-01-01 00:00',
          modified: '2017-01-02 01:00',
          author: {
            id: 1,
            email: 'test1@testmail.com',
            username: 'test_user',
            fullName: 'Test Testerson',
          },
          lineNumber: 22,
        }}
      />
      <Comment
        loggedUsername={'test_user'}
        simpleText
        comment={{
          id: '2',
          text: 'I am a comment by another user',
          created: '2017-01-01 00:00',
          modified: '2017-01-02 01:00',
          author: {
            id: 2,
            email: 'test2@testmail.com',
            username: 'other_user',
            fullName: 'Other Othersen',
          },
          lineNumber: 22,
        }}
      />
      <Comment
        loggedUsername={'test_user'}
        simpleText
        niceToHave
        codeStyle
        issue
        comment={{
          id: '2',
          text: 'I am a comment by another user with all the buttons',
          created: '2017-01-01 00:00',
          modified: '2017-01-02 01:00',
          author: {
            id: 2,
            email: 'test2@testmail.com',
            username: 'other_user',
            fullName: 'Other Othersen',
          },
          lineNumber: 22,
        }}
      />
      <Comment
        loggedUsername={'test_user'}
        newComment
        simpleText
        comment={{
          author: {
            id: 1,
            email: 'test1@testmail.com',
            username: 'test_user',
            fullName: 'Test Testerson',
          },
          lineNumber: 22,
        }}
      />
    </div>
  ))
