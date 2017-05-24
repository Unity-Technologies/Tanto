/* @flow */

import React from 'react'
import type { IssueType } from 'universal/types'
import { connect } from 'react-redux'
import IssuesList from 'components/IssuesList'
import type { StatusType } from 'ducks/fetch/selectors'
import LoadingComponent from 'components/LoadingComponent'
import { pureComponent } from 'components/PureComponent'
import getData from './selectors'


type Props = {
  issues: Array<IssueType>,
  pullRequestId: string,
  status: StatusType,
}

const PullRequestIssues = ({ issues, pullRequestId, status }: Props) =>
  (<LoadingComponent status={status}>
    <IssuesList issues={issues} pullRequestId={pullRequestId} />
  </LoadingComponent>)

export default connect(getData)(pureComponent(PullRequestIssues))
