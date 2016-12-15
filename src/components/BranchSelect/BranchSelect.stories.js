/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BranchSelect from './index'

const branches = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
]

storiesOf('BranchSelect', module)
  .add('enabled', () => (
    <BranchSelect
      defaultValue="bar"
      disabled={false}
      onChange={action('onChange')}
      placeholder="im a placeholder"
      branches={branches}
      prefix="x-"
      project="foo"
    />
  ))
  .add('enabled no placeholder', () => (
    <BranchSelect
      defaultValue="bar"
      disabled={false}
      onChange={action('onChange')}
      branches={branches}
      prefix="x-"
      project="foo"
    />
  ))
  .add('disabled', () => (
    <BranchSelect
      defaultValue="bar"
      disabled
      onChange={action('onChange')}
      placeholder="im a placeholder"
      branches={branches}
      prefix="x-"
      project="foo"
    />
  ))
