/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import Comment from './index.js'

const comment = {
  id: 12,
  text: 'This is some test comment *with markdown*',
  created: '2017-02-09T11:27:26.024159',
  status: '',
  author: {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}


const commentApproved = {
  id: 12,
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

const commentNotReviewed = {
  id: 12,
  created: '2017-02-09T11:27:26.024159',
  status: 'not_reviewed',
  author: {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}


storiesOf('Comment', module)
  .addDecorator(muiTheme())
  .add('read mode when logged user is not owner', () => (
    <div>
      <div style={{ margin: '10px' }}>
        <Comment
          comment={comment}
          loggedUsername={'kate'}
          onUpdate={action('onUpdate')}
          onDelete={action('onDelete')}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <Comment
          comment={comment}
          canEdit
          onUpdate={action('onUpdate')}
          onDelete={action('onDelete')}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <Comment
          comment={commentApproved}

          onUpdate={action('onUpdate')}
          onDelete={action('onDelete')}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <Comment
          comment={commentRejected}

          onUpdate={action('onUpdate')}
          onDelete={action('onDelete')}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <Comment
          comment={commentUnderReview}
          canEdit
          onUpdate={action('onUpdate')}
          onDelete={action('onDelete')}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <Comment
          comment={commentNotReviewed}

          onUpdate={action('onUpdate')}
          onDelete={action('onDelete')}
        />
      </div>
    </div>
  ))

