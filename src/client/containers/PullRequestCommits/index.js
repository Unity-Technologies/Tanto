/* flow */

import React from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import ChangesetList from 'components/ChangesetList'
import type { StatusType } from 'ducks/fetch'
import LoadingComponent from 'components/LoadingComponent'
import getPullRequestCommitsData from './selectors'

type Props = {
  commits: Array<FileType>,
  pullRequestId: string,
  status: StatusType,
  repoName: string
}

const PullRequestCommits = (props: Props) =>
  <LoadingComponent status={props.status}>
    <ChangesetList commits={props.commits} projectName={props.repoName} />
  </LoadingComponent>


export default connect(getPullRequestCommitsData)(PullRequestCommits)

