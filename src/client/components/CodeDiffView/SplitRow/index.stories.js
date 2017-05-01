
/* eslint-disable */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import SplitRow from './index.js'

import { DiffTypes } from 'universal/constants'

const loggedUser = {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
}

const rightComments = [
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

const leftComments = [
{
        id: 2,
        text: 'LEFT COMMENT 1',
        author: loggedUser,
        location: {
          lineNumber: 'n9',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-21T13:02:55.415073'
      },
         {
        id: 4,
        text: 'LEFT COMMENT 2',
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
            leftLine: '    dependencies <span class="token operator" >=</span> <span class="token punctuation" >[</span>\r',
            leftOperation: '-',
            leftCssClass: 'line-removed',
            leftLineNumber: 9,
            isBreak: false,
            rightLine: '    dependencies <span class="token operator" >=</span> dsf<span class="token punctuation" >[</span>\r',
            rightOperation: '+',
            rightCssClass: 'line-added',
            rightLineNumber: 9
          }

storiesOf('SplitRow', module)
  .addDecorator(muiTheme())
  .add('Unified', () => (
    <div style={{ margin: '10px' }}>


            <SplitRow
              loggedUser={loggedUser}
              leftComments={leftComments}
              rightComments={rightComments}
              onCreateInlineComment={action('onCreateInlineComment')}
              onUpdateInlineComment={action('onUpdateInlineComment')}
              onDeleteInlineComment={action('onDeleteInlineComment')}
              {...line}
            />
    </div>
  ))
