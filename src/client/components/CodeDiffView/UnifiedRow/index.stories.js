
/* eslint-disable */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import UnifiedRow from './index.js'

import { DiffTypes } from 'universal/constants'

const loggedUser = {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
}

const comments = [
{
        id: 291,
        text: 'some comment1',
        author: loggedUser,
        location: {
          lineNumber: 'n9',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-21T13:02:55.415073'
      },
         {
        id: 294,
        text: 'some comment1 NSWER 1',
        author: 2,
        location: {
          lineNumber: 'n9',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-26T20:40:19.514698'
      }
]

const line =
{
      line: '         <span class="token punctuation" >(</span><span class="token string" >\'core\'</span><span class="token punctuation" >,</span> <span class="token string" >\'0012_build_tags\'</span><span class="token punctuation" >)</span><span class="token punctuation" >,</span>sdfasdf\r',
      operation: '',
      isBreak: false,
      newLineNumber: 10,
      oldLineNumber: 10,
      cssClass: 'line-common',
    }

storiesOf('UnifiedRow', module)
  .addDecorator(muiTheme())
  .add('Unified', () => (
    <div style={{ margin: '10px' }}>
      <UnifiedRow
        loggedUser={loggedUser}
        comments={comments}
        onCreateInlineComment={action('onCreateInlineComment')}
        onUpdateInlineComment={action('onCreateInlineComment')}
        onDeleteInlineComment={action('onCreateInlineComment')}
        {...line}
      />
    </div>
  ))
