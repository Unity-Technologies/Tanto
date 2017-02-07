/* @flow */

import React from 'react'
import type { IssueType } from 'universal/types'
import { connect } from 'react-redux'
import IssuesList from 'components/IssuesList'
import { types } from 'ducks/pullrequests/actions'
import type { StatusType } from 'ducks/fetch'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import LoadingComponent from 'components/LoadingComponent'
import { getPullRequestIssues } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

type Props = {
  issues: Array<IssueType>,
  pullRequestId: string,
  status: StatusType,
}

export const fetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_ISSUES)

export const getData = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequestIssues, fetchStatus,
    (issues, status, user) => ({
      issues: issues || [],
      status,
    })
  )

const PullRequestIssues = (props: Props) =>
  <LoadingComponent status={props.status}>
    <IssuesList issues={props.issues} />
  </LoadingComponent>

/* flow-disable */
export default connect(getData)(PullRequestIssues)
