/* @flow */

import React from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import CodeDiffView from 'components/CodeDiffView'
import { types } from 'ducks/pullrequests/actions'
import type { StatusType } from 'ducks/fetch'
import { statusFetchCreator } from 'ducks/fetch'
import LoadingComponent from 'components/LoadingComponent'
import { getPullRequestFiles } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'
import { getLoggedUsername } from 'ducks/session/selectors'

type Props = {
  files: Array<FileType>,
  status: StatusType,
  loggedUsername: string,
}

export const fetchStatus = statusFetchCreator(types.FETCH_PULL_REQUEST_DIFF)
export const getData = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequestFiles, fetchStatus, getLoggedUsername,
    (files, status, user) => ({
      files,
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
