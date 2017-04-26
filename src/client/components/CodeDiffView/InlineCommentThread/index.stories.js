/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import InlineCommentThread from './index.js'

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
  issue: null,
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
  issue: null,
}


const comments = [
  comment,
  comment2,
]

const loggedUser = {
  username: 'kate',
  slack: {
    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
  },

}

storiesOf('InlineCommentThread', module)
  .addDecorator(muiTheme())
  .add('thread', () => (
    <div style={{ margin: '10px' }}>
      <InlineCommentThread
        comments={comments}
        loggedUser={loggedUser}
        onDelete={action('onDelete')}
        onUpdate={action('onUpdate')}
        onCreate={action('onSave')}
      />
    </div>
  ))

