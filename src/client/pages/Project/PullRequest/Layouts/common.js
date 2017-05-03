/* @flow */
import React from 'react'
import PullRequestCommits from 'containers/PullRequestCommits'
import PullRequestDiff from 'containers/PullRequestDiff'
import PullRequestIssues from 'containers/PullRequestIssues'
import PullRequestSummary from 'containers/PullRequestSummary'

type Props = {
  type: string,
  pullRequestId: string,
  repoName: string,
}

const CategoryModule = ({ type, pullRequestId, repoName }: Props) =>
  (<div>
    {type === 'summary' &&
      <PullRequestSummary pullRequestId={pullRequestId} repoName={repoName} />
    }
    {type === 'diff' && <PullRequestDiff pullRequestId={pullRequestId} repoName={repoName} />}
    {type === 'commits' &&
      <PullRequestCommits pullRequestId={pullRequestId} repoName={repoName} />
    }
    {type === 'issues' &&
      <PullRequestIssues pullRequestId={pullRequestId} repoName={repoName} />
    }
  </div>)

export default CategoryModule

