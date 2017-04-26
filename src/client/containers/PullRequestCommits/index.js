
import React from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import ChangesetList from 'components/ChangesetList'
import { types } from 'ducks/pullrequests/actions'
import type { StatusType } from 'ducks/fetch'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import LoadingComponent from 'components/LoadingComponent'
import { getPullRequestChangeset } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

type Props = {
  commits: Array<FileType>,
  pullRequestId: string,
  status: StatusType,
  repoName: string
}

export const fetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_CHANGESET)

export const getData = createSelector(
    getPullRequestChangeset, fetchStatus,
    (commits, status) => ({
      commits,
      status,
    })
  )

const PullRequestCommits = (props: Props) =>
  <LoadingComponent status={props.status}>
    <ChangesetList commits={props.commits} projectName={props.repoName} />
  </LoadingComponent>


export default connect(getData)(PullRequestCommits)

