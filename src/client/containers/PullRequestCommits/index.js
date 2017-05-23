/* flow */

import React from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import ChangesetList from 'components/ChangesetList'
import type { StatusType } from 'ducks/fetch'
import LoadingComponent from 'components/LoadingComponent'
import { pureComponent } from 'components/PureComponent'
import getPullRequestCommitsData from './selectors'

type Props = {
  commits: Array<FileType>,
  pullRequestId: string,
  status: StatusType,
  repoName: string
}

const PullRequestCommits = ({ commits, repoName, status, pullRequestId }: Props) =>
  (<LoadingComponent status={status}>
    <ChangesetList commits={commits} projectName={repoName} pullRequestId={pullRequestId} />
  </LoadingComponent>)


export default connect(getPullRequestCommitsData)(pureComponent(PullRequestCommits))

