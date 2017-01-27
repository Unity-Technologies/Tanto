/* @flow */

import React from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import CodeDiffView from 'components/CodeDiffView'
import { types } from 'ducks/pullrequests/actions'
import type { StatusType } from 'ducks/fetch'
import { statusFetchCreator } from 'ducks/fetch'
import LoadingComponent from 'components/LoadingComponent'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

type Props = {
  files: Array<FileType>,
  status: StatusType,
  loggedUsername: string,
}

export const fetchStatus = statusFetchCreator(types.FETCH_PULL_REQUEST_DIFF)
export const getLoggedUser = (state: Object) => state.session.profile.username
export const getData = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequest, fetchStatus, getLoggedUser,
    (pr, status, user) => ({
      files: pr ? pr.files : [],
      status,
      loggedUsername: user,
    })
  )

const PullRequestDiff = (props: Props) =>
  <LoadingComponent status={props.status}>
    <CodeDiffView files={props.files} loggedUsername={props.loggedUsername} />
  </LoadingComponent>

/* flow-disable */
export default connect(getData)(PullRequestDiff)
