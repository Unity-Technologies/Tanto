/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import FileList from './FileList.js'

storiesOf('FileList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <FileList
      data={[
        {
          children: false,
          name: 'foo',
          size: 42,
          revision: 'yzw_rev',
          commitmessage: 'A commit msg',
          updated: '...',
          author: 'johndoe',
        },
        {
          children: true,
          name: 'bar',
          size: 100,
          revision: 'yzw_rev',
          commitmessage: 'A longer commit msg',
          updated: '...',
          author: 'johndoe',
        },
      ]}
      onFileClick={() => action('onFileClick')}
    />
  ))
