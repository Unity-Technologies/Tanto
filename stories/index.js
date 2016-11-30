/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BranchSelect from '../src/components/BranchSelect/BranchSelect'
import ChangesetDelta from '../src/components/ChangesetDelta/ChangesetDelta'

storiesOf('BranchSelect', module)
  .add('enabled', () => (
    <BranchSelect
      defaultValue="bar"
      disabled={false}
      onChange={action('onChange')}
      placeholder="im a placeholder"
      prefix="x-"
      project="foo"
    />
  ))
  .add('enabled no placeholder', () => (
    <BranchSelect
      defaultValue="bar"
      disabled={false}
      onChange={action('onChange')}
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
      prefix="x-"
      project="foo"
    />
  ))

storiesOf('ChangesetDelta', module)
  .add('deleted details', () => (
    <ChangesetDelta
      deleted={10}
      changed={20}
      added={30}
      showDetails
    />
  ))
  .add('without details', () => (
    <ChangesetDelta
      deleted={10}
      changed={20}
      added={30}
    />
  ))
