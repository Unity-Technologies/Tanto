/* @flow */
import React from 'react'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import PullRequestVoteMenu from './PullRequestVoteMenu'
import IssueMenu from './IssueMenu'

type Props = {
  Title: string,
  onReviewAction?: (action: string) => void,
  onCreateIssueAction?: (issue: string) => void,
}

const Header = ({ Title, onReviewAction, onCreateIssueAction }: Props) => (
  <div className="comment-box-header edit-mode">
    <div className="comment-title">{Title}</div>
    <div className="comment-box-actions">
      <ButtonToolbar>
        <PullRequestVoteMenu onReviewAction={onReviewAction} />
        <IssueMenu onCreateIssueAction={onCreateIssueAction} />
      </ButtonToolbar>
    </div>
  </div>
)

export default Header

