/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import Checkbox from './Checkbox.js'

storiesOf('Checkbox', module)
  .add('not checked', () => (
    <Checkbox
      value={42}
      onChange={action('onChange')}
      name={'label-42'}
      checked={false}
      disabled={false}
    />
  ))
  .add('checked', () => (
    <Checkbox
      value={42}
      onChange={action('onChange')}
      name={'label-42'}
      checked
      disabled={false}
    />
  ))
  .add('disabled', () => (
    <Checkbox
      value={42}
      onChange={action('onChange')}
      name={'label-42'}
      checked={false}
      disabled
    />
  ))
