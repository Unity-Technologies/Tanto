/* @flow */
import React from 'react'
// import { createSelector } from 'reselect'

// import ChangesetFileList from 'components/ChangesetFileList'
// import ChangesetGroupedList from 'components/ChangesetGroupedList'
import PullRequestDiff from 'containers/PullRequestDiff'
// import IssuesList from 'components/IssuesList'
import PullRequestDiscussion from 'containers/PullRequestDiscussion'
import PullRequestSummary from 'containers/PullRequestSummary'

type Props = {
  type: string,
  pullRequestId: string,
}

const CategoryModule = ({ type, pullRequestId }: Props) =>
  (<div>
    {type === 'summary' &&
      <PullRequestSummary pullRequestId={pullRequestId} />
    }
    {type === 'discussion' && <PullRequestDiscussion pullRequestId={pullRequestId} />}
    {type === 'diff' && <PullRequestDiff pullRequestId={pullRequestId} />}
    {/* {type === 'changesets' &&
      <ChangesetGroupedList accordion={false} pullRequestId={pullRequestId} />}
    {type === 'issues' && <IssuesList pullRequestId={pullRequestId} />}
    {type === 'diff' && <CodeDiffView pullRequestId={pullRequestId} />
    }*/}
  </div>)

export default CategoryModule

