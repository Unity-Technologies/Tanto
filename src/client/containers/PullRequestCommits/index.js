/* @flow */

import React from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import ChangesetList from 'components/ChangesetList'
import { types } from 'ducks/pullrequests/actions'
import type { StatusType } from 'ducks/fetch'
import { statusFetchCreator } from 'ducks/fetch'
import LoadingComponent from 'components/LoadingComponent'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

type Props = {
  commits: Array<FileType>,
  pullRequestId: string,
  status: StatusType,
}

export const fetchStatus = statusFetchCreator(types.FETCH_PULL_REQUESTS_CHANGESET)

// TODO: if we get displaying groups of commits
// export const reduceCommitsByRawId = (commits) =>
//   commits.reduce((groups, commit) => {
//     if (commit.rawId in groups) {
//       groups[commit.rawId].push(commit)
//     } else {
//       groups[commit.rawId] = [commit]  // eslint-disable-line no-param-reassign
//     }
//     return groups
//   }, {})

export const getData = (state: Object, props: Object): string =>
  createSelector(
    getPullRequest, fetchStatus,
    (pr, status, user) => ({
      commits: pr ? pr.changeset : [],
      projectName: pr ? pr.origin.repository.fullName : '',
      status,
    })
  )

const PullRequestCommits = (props: Props) =>
  <LoadingComponent status={props.status}>
    <ChangesetList commits={props.commits} projectName={props.projectName} />
  </LoadingComponent>

export default connect(getData)(PullRequestCommits)
