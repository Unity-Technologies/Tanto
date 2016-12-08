/* @flow */

import React from 'react'
import Scroll from 'react-scroll'

import ChangesetFileList from 'components/ChangesetFileList'
import ChangesetGroupedList from 'components/ChangesetGroupedList'
import CodeDiffView from 'components/CodeDiffView'
import Divider from 'components/Divider'
import IssuesList from 'components/IssuesList'
import PullRequestDiscussion from 'components/PullRequestDiscussion'
import PullRequestSummary from 'components/PullRequestSummary'

import type { PullRequestGraphType } from 'ducks/pullRequest'
import {
  PullRequestData, prChangesetList, prIssues,
} from '../../../../api/testPullRequest'

const Element = Scroll.Element

const noop = () => {}

export type Props = {
  pullRequest: PullRequestGraphType,
}

// TODO: should be seperate URL from developer (simpel redirect if guardian)
const LayoutGuardian = ({ pullRequest }: Props) =>
  <div style={{ padding: '0 20px' }}>
    <Element name="page-top" className="element" />
    <Element name="summary" className="element">
      <div>
        <PullRequestSummary
          onAddReviewer={noop}
          onToggleReviewers={noop}
          toggleReviewers={false}
          pullRequest={pullRequest}
        />
      </div>
    </Element>
    <Element name="files" className="element">
      <Divider text="Files" />
      <div>
        <ChangesetFileList files={pullRequest.files} />
      </div>
    </Element>
    <Element name="changesets" className="element">
      <Divider text="Changesets" />
      <div>
        <ChangesetGroupedList accordion data={prChangesetList} />
      </div>
    </Element>
    <Element name="issues" className="element">
      <Divider text="Issues" />
      <div>
        <IssuesList issues={prIssues} />
      </div>
    </Element>
    <Element name="discussion" className="element">
      <Divider text="Discussion" />
      <PullRequestDiscussion
        onSaveComment={noop}
      />
    </Element>
    <Element name="diff" className="element">
      <Divider text="Diff" />
      <div>
        <CodeDiffView files={PullRequestData} />
      </div>
    </Element>
    <Element name="page-bottom" />
  </div>

export default LayoutGuardian
