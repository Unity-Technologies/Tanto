/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Comment from './Comment.js'

const twoParagraphs = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium, tellus et bibendum tempus, velit purus euismod mauris, eget fermentum libero lectus viverra diam. Curabitur eu purus odio. Duis at tellus diam. Sed a nulla sit amet lorem posuere gravida vitae congue tortor. Nulla vulputate molestie lacus, a pellentesque erat vehicula et. Nullam vel arcu nisl. Donec id magna et turpis pulvinar accumsan. Pellentesque mattis finibus lacus vitae hendrerit. Suspendisse vestibulum erat in nulla euismod porta mollis sed augue. Phasellus purus purus, dignissim at erat ac, maximus accumsan nisl. Maecenas ut vulputate turpis. Fusce odio urna, sodales a leo at, sagittis tincidunt nisl. Vivamus auctor ullamcorper leo at volutpat. Pellentesque consequat eros ornare mauris porttitor tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce condimentum urna id dolor pretium ultricies. \n\nVivamus facilisis quam ac turpis blandit, a condimentum enim pharetra. Donec pharetra, orci non fringilla volutpat, leo dolor vulputate purus, sit amet rutrum arcu ante id odio. Donec et varius justo. Mauris molestie suscipit mi, nec dignissim massa dapibus quis. Morbi in libero quis nunc porttitor venenatis. Sed convallis, dolor vel accumsan faucibus, odio orci convallis ante, ultricies gravida dolor eros nec tellus. Praesent non purus ullamcorper, condimentum turpis id, semper risus. Proin vitae fringilla enim. Nunc sagittis odio quis ullamcorper efficitur.'

storiesOf('Comment', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <div>
      <Comment
        loggedUsername={'test_user'}
        simpleText
        comment={{
          id: '1',
          text: twoParagraphs,
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
          text: 'I am a comment by another user, and this comment changes my vote to rejected.',
          created: '2017-01-01 00:00',
          modified: '2017-01-02 01:00',
          author: {
            id: 2,
            email: 'test2@testmail.com',
            username: 'other_user',
            fullName: 'Other Othersen',
          },
          lineNumber: 22,
          status: 'rejected',
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
          status: 'under_review',
        }}
      />
      <Comment
        loggedUsername={'test_user'}
        simpleText
        comment={{
          author: {
            id: 1,
            email: 'test1@testmail.com',
            username: 'test_user',
            fullName: 'Test Testerson',
          },
          lineNumber: 22,
          status: 'approved',
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
