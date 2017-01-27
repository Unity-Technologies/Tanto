/* @flow */

import React from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import IssuesList from 'components/IssuesList'
import { types } from 'ducks/pullrequests/actions'
import type { StatusType } from 'ducks/fetch'
import { statusFetchCreator } from 'ducks/fetch'
import LoadingComponent from 'components/LoadingComponent'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

type Props = {
  files: Array<FileType>,
  pullRequestId: string,
  status: StatusType,
}

export const fetchStatus = statusFetchCreator(types.FETCH_PULL_REQUEST_ISSUES)

export const getData = (state: Object, props: Object): string =>
  createSelector(
    getPullRequest, fetchStatus,
    (pr, status, user) => ({
      issues: pr ? pr.issues : [],
      status,
    })
  )

const PullRequestIssues = (props: Props) =>
  <LoadingComponent status={props.status}>
    <IssuesList issues={props.issues} />
  </LoadingComponent>

export default connect(getData)(PullRequestIssues)
