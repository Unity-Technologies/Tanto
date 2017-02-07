/* @flow */

import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import PullRequestList from './index.js'
import { ChangesetStatus } from 'universal/constants'


const repository1 = {
  name: 'repo1',
  fullName: 'repository1',
}

const pr1 = {
  id: '1',
  title: 'Test PR 1 under review',
  status: ChangesetStatus.UNDER_REVIEW,
  created: '2016-09-21 00:00',
  updated: '2016-10-21 00:00',
  target: {
    repository: repository1,
    name: 'targetName',
  },
  origin: {
    repository: repository1,
    name: 'originName',
  },
  owner: 'JohnDoe',
}

const pr2 = {
  id: '2',
  title: 'Test PR 2 new',
  status: ChangesetStatus.NEW,
  created: '2017-01-21 00:00',
  updated: '2017-01-22 00:00',
  target: {
    repository: repository1,
    name: 'targetName1',
  },
  origin: {
    repository: repository1,
    name: 'originName1',
  },
  owner: 'JohnDoe',
}

const prListItems = [pr1, pr2]

storiesOf('PullRequestList', module)
  .addDecorator(muiTheme())
  .add('empty', () => (
    <PullRequestList
      items={[]}
      isFetching={false}
      totalPagesCount={1}
      activePage={1}
      pageSize={12}
      onPageSelect={() => {}}
    />
  ))
  .add('fetching', () => (
    <PullRequestList
      items={prListItems}
      isFetching
      activePage={1}
      pageSize={12}
      onPageSelect={() => { }}
    />
  ))
  .add('loaded', () => (
    <PullRequestList
      items={prListItems}
      isFetching={false}
      activePage={1}
      pageSize={12}
      onPageSelect={() => { }}
    />
  ))
