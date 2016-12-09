/* @flow */
import React from 'react'

import ChangesetFileList from 'components/ChangesetFileList'
import ChangesetGroupedList from 'components/ChangesetGroupedList'
import CodeDiffView from 'components/CodeDiffView'
import IssuesList from 'components/IssuesList'
import PullRequestDiscussion from 'components/PullRequestDiscussion'
import PullRequestSummary from 'components/PullRequestSummary'

import type { PullRequestGraphType } from 'ducks/pullRequest'

import {
  PullRequestData, prChangesetList, prIssues,
} from '../../../../api/testPullRequest'

const noop = () => {}

type Props = {
  type: string,
  pullRequest: PullRequestGraphType,
}

/**
 * An attempt to share logic between developer and guardian layout.
 */
const CategoryModule = ({ type, pullRequest }: Props) =>
  <div>
    {type === 'summary' &&
      <PullRequestSummary
        onAddReviewer={noop}
        onToggleReviewers={noop}
        pullRequest={pullRequest}
        toggleReviewers={false}
      />
    }
    {type === 'discussion' &&
      <PullRequestDiscussion
        onSaveComment={noop}
      />
    }
    {type === 'files' &&
      <ChangesetFileList files={pullRequest.files} />
    }
    {type === 'changesets' &&
      <ChangesetGroupedList accordion={false} data={prChangesetList} />
    }
    {type === 'issues' &&
      <IssuesList issues={prIssues} />
    }
    {type === 'diff' &&
      <CodeDiffView files={PullRequestData} />
    }
  </div>

export default CategoryModule
