/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import GeneralCommentThread from './index.js'

const comment = {
  id: 12,
  text: 'This is some test comment *with markdown* `block code`',
  created: '2017-02-09T11:27:26.024159',
  author: {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}


const commentApproved = {
  id: 13,
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
  id: 14,
  text: `Here's a numbered list:

 1. first item
 2. second item
 3. third item
`,
  status: 'rejected',
  author: {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}

const comment2 = {
  id: 15,
  text: `sjdhkjashldkajslkdjalksdjlakjdslaksjdl alsksjdlka lajsdlka  l aldsjlak
`,

  author: {
    username: 'kate',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}


const commentUnderReview = {
  id: 16,
  text: `An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and monospace. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.
`,
  created: '2017-02-09T11:27:26.024159',
  status: 'under_review',
  author: {
    username: 'kate',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}

const commentNotReviewed = {
  id: 17,
  created: '2017-02-09T11:27:26.024159',
  status: 'not_reviewed',
  author: {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}


const comments = [comment, commentApproved, comment2, commentNotReviewed, commentRejected, commentUnderReview]

const loggedUser = {
  username: 'kate',
  slack: {
    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
  },

}

const description = {
  text: 'PULL request DESCRIPIOTN',
  created: '2017-02-09T11:27:26.024159',
  author: {
    username: 'kate',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
  },
}

storiesOf('GeneralCommentThread', module)
  .addDecorator(muiTheme())
  .add('thread', () => (
    <div style={{ margin: '10px' }}>
      <GeneralCommentThread
        comments={comments}
        repoId={23455}
        pullRequestId={18}
        loggedUser={loggedUser}
        description={description}
        onDelete={action('onDelete')}
        onUpdate={action('onUpdate')}
        onSave={action('onSave')}
        onDescriptionUpdate={action('onDescriptionUpdate')}
      />
    </div>
  ))

