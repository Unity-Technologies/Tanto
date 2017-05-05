/* @flow */
import React from 'react'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import VoteForPullRequestMenu from 'components/VoteForPullRequestMenu'
import IssueMenu from 'components/IssueMenu'
import './Comment.css'

type Props = {
  Title: string,
  onReviewAction?: (action: string) => void,
  onCreateIssueAction?: (issue: string) => void,
}

const CommentHeaderMenu = ({ Title, onReviewAction, onCreateIssueAction }: Props) => (
  <div className="comment-box-header edit-mode">
    <div className="comment-title">{Title}</div>
    <div className="comment-box-actions">
      <ButtonToolbar>
        <VoteForPullRequestMenu onReviewAction={onReviewAction} />
        <IssueMenu onCreateIssueAction={onCreateIssueAction} />
      </ButtonToolbar>
    </div>
  </div>
)

export default CommentHeaderMenu

