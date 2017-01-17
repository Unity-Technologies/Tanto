/* @flow */
import React from 'react'
import { createSelector } from 'reselect'

import ChangesetFileList from 'components/ChangesetFileList'
import ChangesetGroupedList from 'components/ChangesetGroupedList'
import CodeDiffView from 'components/CodeDiffView'
import IssuesList from 'components/IssuesList'
import PullRequestDiscussion from 'components/PullRequestDiscussion'
import PullRequestSummary from 'containers/PullRequestSummary'

import type { PullRequestGraphType } from 'services/ono/queries/pullRequest'

import { buildProjectLink } from 'routes/helpers'

import {
  PullRequestData, prChangesetList, prIssues,
} from '../../../../api/testPullRequest'

const noop = () => {}

type Props = {
  type: string,
  pullRequest: PullRequestGraphType,
}

const getPath = originOrTarget => ({
  url: buildProjectLink(originOrTarget.repository.name, originOrTarget.branch),
  label: `${originOrTarget.repository.name}#${originOrTarget.branch}`,
})

const pathsSelector = createSelector(
  pullRequest => pullRequest,
  pullRequest => ({
    origin: getPath(pullRequest.origin),
    target: getPath(pullRequest.target),
  })
)

/**
 * An attempt to share logic between developer and guardian layout.
 */
const CategoryModule = ({ type, pullRequest }: Props) => {
  const paths = pathsSelector(pullRequest)

  return (
    <div>
      {type === 'summary' &&
        <PullRequestSummary
          onAddReviewer={noop}
          onToggleReviewers={noop}
          paths={paths}
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
  )
}

export default CategoryModule
