/* @flow */
import React from 'react'
import Avatar from 'components/Avatar'
import RichTextEditor from 'components/RichTextEditor'
import Header from './Header'
import type { UserType } from 'components/GeneralCommentThread'
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
    issueStatus: any,
    reviewStatus: any,
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
    const issue = this.state.issueStatus !== IssueStatus.NONE ? { status: this.state.issueStatus } : null
    this.props.onSave(text, this.state.reviewStatus, issue)
    this.setState({
      reviewStatus: ChangesetStatus.NONE,
      issueStatus: IssueStatus.NONE,
    })
  }

  render() {
    return (
      <div className="comment-box">
        <div className="comment-box-avatar">
          <Avatar avatar={this.props.loggedUser.slack ? this.props.loggedUser.slack.avatar : ''} />
        </div>
        <div className="comment-box-content" >
          <Header
            title="Leave a comment"
            issueStatus={this.state.issueStatus}
            reviewStatus={this.state.reviewStatus}
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
