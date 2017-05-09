/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import IssueMenu from './index.js'

storiesOf('IssueMenu', module)
  .add('empty default', () => (
    <div style={{ marginLeft: 150 }}>
      <IssueMenu onStatusSelect={action('onStatusSelect')} />
    </div>
  ))
