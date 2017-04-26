
/* eslint-disable */

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import CodeDiffView from './index.js'

import { DiffTypes } from 'universal/constants'

const loggedUser = {
    username: 'johne',
    slack: {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    },
}
const diff = {
  0: [
    {
      line: '@@ <span class="token operator" >-</span><span class="token number" >6</span><span class="token punctuation" >,</span><span class="token number" >7</span> <span class="token operator" >+</span><span class="token number" >6</span><span class="token punctuation" >,</span><span class="token number" >7</span> @@ from django<span class="token punctuation" >.</span>db import models<span class="token punctuation" >,</span> migrations',
      operation: '',
      isBreak: true,
      newLineNumber: '',
      oldLineNumber: '',
      cssClass: 'line-break',
    },
    {
      line: ' \r',
      operation: '',
      isBreak: false,
      newLineNumber: 6,
      oldLineNumber: 6,
      cssClass: 'line-common',
    },
    {
      line: ' class <span class="token class-name" >Migration</span><span class="token punctuation" >(</span>migrations<span class="token punctuation" >.</span>Migration<span class="token punctuation" >)</span><span class="token punctuation" >:</span>\r',
      operation: '',
      isBreak: false,
      newLineNumber: 7,
      oldLineNumber: 7,
      cssClass: 'line-common',
    },
    {
      line: ' \r',
      operation: '',
      isBreak: false,
      newLineNumber: 8,
      oldLineNumber: 8,
      cssClass: 'line-common',
    },
    {
      line: '    dependencies <span class="token operator" >=</span> <span class="token punctuation" >[</span>\r',
      operation: '-',
      isBreak: false,
      cssClass: 'line-removed',
      oldLineNumber: 9,
      newLineNumber: '',
    },
    {
      line: '    dependencies <span class="token operator" >=</span> dsf<span class="token punctuation" >[</span>\r',
      operation: '+',
      isBreak: false,
      cssClass: 'line-added',
      newLineNumber: 9,
      oldLineNumber: '',
    },
    {
      line: '         <span class="token punctuation" >(</span><span class="token string" >\'core\'</span><span class="token punctuation" >,</span> <span class="token string" >\'0012_build_tags\'</span><span class="token punctuation" >)</span><span class="token punctuation" >,</span>sdfasdf\r',
      operation: '',
      isBreak: false,
      newLineNumber: 10,
      oldLineNumber: 10,
      cssClass: 'line-common',
    },
    {
      line: '     <span class="token punctuation" >]</span>\r',
      operation: '',
      isBreak: false,
      newLineNumber: 11,
      oldLineNumber: 11,
      cssClass: 'line-common',
    },
    {
      line: ' \r',
      operation: '',
      isBreak: false,
      newLineNumber: 12,
      oldLineNumber: 12,
      cssClass: 'line-common',
    },
    {
      line: '',
      operation: '',
      isBreak: false,
      newLineNumber: 13,
      oldLineNumber: 13,
      cssClass: 'line-common',
    },
  ],
  1: [
    {
      leftLine: '@@ <span class="token operator" >-</span><span class="token number" >6</span><span class="token punctuation" >,</span><span class="token number" >7</span> <span class="token operator" >+</span><span class="token number" >6</span><span class="token punctuation" >,</span><span class="token number" >7</span> @@ from django<span class="token punctuation" >.</span>db import models<span class="token punctuation" >,</span> migrations',
      leftOperation: '',
      leftCssClass: 'line-break',
      leftLineNumber: '',
      isBreak: true,
      rightLine: '@@ <span class="token operator" >-</span><span class="token number" >6</span><span class="token punctuation" >,</span><span class="token number" >7</span> <span class="token operator" >+</span><span class="token number" >6</span><span class="token punctuation" >,</span><span class="token number" >7</span> @@ from django<span class="token punctuation" >.</span>db import models<span class="token punctuation" >,</span> migrations',
      rightOperation: '',
      rightCssClass: 'line-break',
      rightLineNumber: '',
    },
    {
      leftLine: ' \r',
      leftOperation: '',
      leftCssClass: 'line-common',
      isBreak: false,
      leftLineNumber: 6,
      rightLine: ' \r',
      rightOperation: '',
      rightCssClass: 'line-common',
      rightLineNumber: 6,
    },
    {
      leftLine: ' class <span class="token class-name" >Migration</span><span class="token punctuation" >(</span>migrations<span class="token punctuation" >.</span>Migration<span class="token punctuation" >)</span><span class="token punctuation" >:</span>\r',
      leftOperation: '',
      leftCssClass: 'line-common',
      isBreak: false,
      leftLineNumber: 7,
      rightLine: ' class <span class="token class-name" >Migration</span><span class="token punctuation" >(</span>migrations<span class="token punctuation" >.</span>Migration<span class="token punctuation" >)</span><span class="token punctuation" >:</span>\r',
      rightOperation: '',
      rightCssClass: 'line-common',
      rightLineNumber: 7,
    },
    {
      leftLine: ' \r',
      leftOperation: '',
      leftCssClass: 'line-common',
      isBreak: false,
      leftLineNumber: 8,
      rightLine: ' \r',
      rightOperation: '',
      rightCssClass: 'line-common',
      rightLineNumber: 8,
    },
    {
      leftLine: '    dependencies <span class="token operator" >=</span> <span class="token punctuation" >[</span>\r',
      leftOperation: '-',
      leftCssClass: 'line-removed',
      leftLineNumber: 9,
      isBreak: false,
      rightLine: '    dependencies <span class="token operator" >=</span> dsf<span class="token punctuation" >[</span>\r',
      rightOperation: '+',
      rightCssClass: 'line-added',
      rightLineNumber: 9,
    },
    {
      leftLine: '         <span class="token punctuation" >(</span><span class="token string" >\'core\'</span><span class="token punctuation" >,</span> <span class="token string" >\'0012_build_tags\'</span><span class="token punctuation" >)</span><span class="token punctuation" >,</span>sdfasdf\r',
      leftOperation: '',
      leftCssClass: 'line-common',
      isBreak: false,
      leftLineNumber: 10,
      rightLine: '         <span class="token punctuation" >(</span><span class="token string" >\'core\'</span><span class="token punctuation" >,</span> <span class="token string" >\'0012_build_tags\'</span><span class="token punctuation" >)</span><span class="token punctuation" >,</span>sdfasdf\r',
      rightOperation: '',
      rightCssClass: 'line-common',
      rightLineNumber: 10,
    },
    {
      leftLine: '     <span class="token punctuation" >]</span>\r',
      leftOperation: '',
      leftCssClass: 'line-common',
      isBreak: false,
      leftLineNumber: 11,
      rightLine: '     <span class="token punctuation" >]</span>\r',
      rightOperation: '',
      rightCssClass: 'line-common',
      rightLineNumber: 11,
    },
    {
      leftLine: ' \r',
      leftOperation: '',
      leftCssClass: 'line-common',
      isBreak: false,
      leftLineNumber: 12,
      rightLine: ' \r',
      rightOperation: '',
      rightCssClass: 'line-common',
      rightLineNumber: 12,
    },
    {
      leftLine: '',
      leftOperation: '',
      leftCssClass: 'line-common',
      isBreak: false,
      leftLineNumber: 13,
      rightLine: '',
      rightOperation: '',
      rightCssClass: 'line-common',
      rightLineNumber: 13,
    },
  ],
}

const comments = {
  "n9": [{
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
      },
      {
        id: 295,
        text: 'some comment1 NAWS 2',
        author: loggedUser,
        location: {
          lineNumber: 'n9',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-26T20:40:30.943781'
      }
      ],
  "o9": [{
        id: 293,
        text: 'some comment 3',
        author: 2,
        location: {
          lineNumber: 'o9',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-21T13:03:08.845403'
      },
      {
        id: 296,
        text: 'some comment 3 2',
        author: 2,
        location: {
          lineNumber: 'o9',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-26T20:40:37.330431'
      },
   {
        id: 297,
        text: 'some comment 3 3',
        author: 2,
        location: {
          lineNumber: 'o9',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-26T20:40:41.688801'
      },
      ],
  "o10": [{
        id: 292,
        text: 'some comment 2',
        author: 2,
        location: {
          lineNumber: 'n10',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-21T13:03:01.743379'
      },
       {
        id: 298,
        text: 'some comment  22',
        author: 2,
        location: {
          lineNumber: 'n10',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-26T20:40:49.526246'
      },
      {
        id: 298,
        text: 'some comment  22',
        author: 2,
        location: {
          lineNumber: 'n10',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-26T20:40:49.526246'
      },
      {
        id: 298,
        text: 'some comment  22',
        author: 2,
        location: {
          lineNumber: 'n10',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-26T20:40:49.526246'
      },
       {
        id: 298,
        text: 'some comment  22',
        author: 2,
        location: {
          lineNumber: 'n10',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-26T20:40:49.526246'
      },
      ],
 "n11": [
    {
        id: 309,
        text: 'APIhf   fff',
        author: 2,
        location: {
          lineNumber: 'n11',
          filePath: 'migrations/0013_sourcestamp_revision.py'
        },
        created: '2017-04-27T13:06:38.071384'
      }
 ]
    }

storiesOf('CodeDiffView', module)
  .addDecorator(muiTheme())
  .add('Unified', () => (
    <div style={{ margin: '10px' }}>
       <CodeDiffView
        type={""}
        comments={comments}
        rawDiff={diff}
        unifiedDiff={diff[DiffTypes.UNIFIED]}
        sideBySideDiff={diff[DiffTypes.SIDE_BY_SIDE]}
        loggedUser={loggedUser}
        viewType={DiffTypes.UNIFIED}
        onCreateInlineComment={action('onCreateInlineComment')}
        onUpdateInlineComment={action('onUpdateInlineComment')}
        onDeleteInlineComment={action('onDeleteInlineComment')}
      />
    </div>
  ))
    .add('Split', () => (
    <div style={{ margin: '10px' }}>
       <CodeDiffView
        type={""}
        comments={comments}
        rawDiff={diff}
        unifiedDiff={diff[DiffTypes.UNIFIED]}
        sideBySideDiff={diff[DiffTypes.SIDE_BY_SIDE]}
        loggedUser={loggedUser}
        viewType={DiffTypes.SIDE_BY_SIDE}
        onCreateInlineComment={action('onCreateInlineComment')}
        onDeleteInlineComment={action('onDeleteInlineComment')}
        onUpdateInlineComment={action('onUpdateInlineComment')}
      />
    </div>
  ))
