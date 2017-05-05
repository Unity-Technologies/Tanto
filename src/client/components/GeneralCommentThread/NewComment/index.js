/* @flow */
import React from 'react'
import Avatar from 'components/Avatar'
import RichTextEditor from 'components/RichTextEditor'
import CommentHeaderMenu from 'components/GeneralCommentThread/Comment/CommentHeaderMenu'
import type { UserType } from '../index.js'
import { ChangesetStatus, IssueStatus } from 'universal/constants'


type Props = {
  loggedUser: UserType,
  onSave: (text: string) => void,
  onCancel: () => void,
}

class NewComment extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      reviewStatus: ChangesetStatus.NONE,
      issueStatus: IssueStatus.NONE,
    }
  }

  state: {
    issueStatus: string,
    reviewStatus: string,
    text?: string,
  }

  handleReviewAction = (action: string) => {
    this.setState({
      reviewStatus: action,
    })
  }

  handleCreateIssueAction = (issue: string) => {
    this.setState({
      issueStatus: issue,
    })
  }

  handleAddComment = (text: string) => {
    this.setState({
      text,
    })
    this.props.onSave(text, this.state.reviewStatus, this.state.issueStatus)
  }

  render() {
    return (
      <div className="comment-box">
        <div className="comment-box-avatar">
          <Avatar avatar={this.props.loggedUser.slack ? this.props.loggedUser.slack.avatar : ''} />
        </div>
        <div className="comment-box-content" >
          <CommentHeaderMenu
            Title="New comment"
            onReviewAction={this.handleReviewAction}
            onCreateIssueAction={this.handleCreateIssueAction}
          />
          <RichTextEditor
            onCancel={this.props.onCancel}
            onSave={this.handleAddComment}
            cancelButtonTitle={'Close Pull Request'}
            saveButtonTitle={'Add comment'}
          />
        </div>
      </div>
    )
  }
}

export default NewComment
