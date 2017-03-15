/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import Comment from './index.js'

const comment = {
  id: 12,
  text: 'This is some test comment *with markdown*',
  created: '2017-02-09T11:27:26.024159',
  author: {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}


const commentApproved = {
  id: 12,
  text: 'This is some test comment *with markdown*',
  created: '2017-02-09T11:27:26.024159',
  status: 'approved',
  author: {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}

const commentRejected = {
  id: 12,
  text: 'This is some test comment *with markdown*',
  created: '2017-02-09T11:27:26.024159',
  status: 'rejected',
  author: {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}

const commentUnderReview = {
  id: 12,
  text: 'This is some test comment *with markdown*',
  created: '2017-02-09T11:27:26.024159',
  status: 'under_review',
  author: {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}

storiesOf('Comment2', module)
  .addDecorator(muiTheme())
  .add('read mode when logged user is not owner', () => (
    <Comment
      comment={comment}
      loggedUsername={'kate'}
      onUpdate={action('onUpdate')}
      onDelete={action('onDelete')}
    />
  ))

  .add('read mode when logged user is owner', () => (
    <div>
      <Comment
        comment={comment}
        canEdit
        onUpdate={action('onUpdate')}
        onDelete={action('onDelete')}
      />
    </div>
  ))
  .add('status approved', () => (
    <div>
      <Comment
        comment={commentStatus}
        canEdit
        onUpdate={action('onUpdate')}
        onDelete={action('onDelete')}
      />
    </div>
  ))

  .add('status rejected', () => (
    <div>
      <Comment
        comment={commentStatus}
        canEdit
        onUpdate={action('onUpdate')}
        onDelete={action('onDelete')}
      />
    </div>
  ))

  .add('status under review', () => (
    <div>
      <Comment
        comment={commentStatus}
        canEdit
        onUpdate={action('onUpdate')}
        onDelete={action('onDelete')}
      />
    </div>
  ))
  .add('status default', () => (
    <div>
      <Comment
        comment={commentStatus}
        canEdit
        onUpdate={action('onUpdate')}
        onDelete={action('onDelete')}
      />
    </div>
  ))

