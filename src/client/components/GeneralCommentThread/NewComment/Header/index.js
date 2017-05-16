/* @flow */
import React from 'react'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import PullRequestVoteMenu from './PullRequestVoteMenu'
import IssueMenu from 'components/IssueMenu'
import { IssueStatus, ChangesetStatus } from 'universal/constants'

type Props = {
  title: string,
  onReviewAction: (action: string) => void,
  onCreateIssueAction: (issue: string) => void,
  issueStatus: any,
  reviewStatus: any
}

export const Header = (props: Props) => {
  const renderVoteMenu = props.issueStatus === IssueStatus.NONE
  const renderIssueMenu = props.reviewStatus === ChangesetStatus.NONE
  return (
    <div className="comment-box-header edit-mode" >
      <div className="comment-title">{props.title}</div>
      <div className="comment-box-actions">
        <ButtonToolbar>
          {renderVoteMenu &&
            <PullRequestVoteMenu reviewStatus={props.reviewStatus} onStatusSelect={props.onReviewAction} />}
          {renderIssueMenu &&
            <IssueMenu issueStatus={props.issueStatus} onStatusSelect={props.onCreateIssueAction} />}
        </ButtonToolbar>
      </div>
    </div>
  )
}

export default Header

