/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import RichTextEditor from './index.js'

storiesOf('RichTextEditor', module)
  .add('empty default', () => (
    <RichTextEditor />
  ))
  .add('with text and event handlers', () => (
    <RichTextEditor
      text={'test ***test****'}
      onChange={action('onChange')}
      onCancel={action('onCancel')}
      onSave={action('onSave')}
    />
  ))
  .add('with custom button titles', () => (
    <RichTextEditor
      text={'test ***test****'}
      onChange={action('onChange')}
      onCancel={action('onCancel')}
      onSave={action('onSave')}
      cancelButtonTitle={'Close'}
      saveButtonTitle={'Add comment'}
    />
  ))
  .add('read mode', () => (
    <RichTextEditor
      text={'test ***test*** `aomething` [test](test.com)'}
      readMode
    />
  ))
