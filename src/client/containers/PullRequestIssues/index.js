/* @flow */

import React from 'react'
import type { IssueType } from 'universal/types'
import { connect } from 'react-redux'
import IssuesList from 'components/IssuesList'
import getData from './selectors'
import type { StatusType } from 'ducks/fetch/selectors'
import LoadingComponent from 'components/LoadingComponent'


type Props = {
  issues: Array<IssueType>,
  pullRequestId: string,
  status: StatusType,
}

const PullRequestIssues = (props: Props) =>
  <LoadingComponent status={props.status}>
    <IssuesList issues={props.issues} />
  </LoadingComponent>

export default connect(getData)(PullRequestIssues)
