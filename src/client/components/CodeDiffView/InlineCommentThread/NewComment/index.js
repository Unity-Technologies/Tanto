/* @flow */
import React from 'react'
import RichTextEditor from 'components/RichTextEditor'
import Avatar from 'components/Avatar'
import type { UserType } from '../index.js'
import IssueMenu from 'components/IssueMenu'
import { IssueStatus } from 'universal/constants'
import PureComponent from 'components/PureComponent'

export type Props = {
  loggedUser: UserType,
  onSave: (text: string, issue: any) => void,
  onClose: Function
}

class NewComment extends PureComponent {
  constructor(props: Props) {
    super(props)

    this.state = {
      issueStatus: IssueStatus.NONE,
    }
  }

  state: {
    issueStatus: string
  }
  props: Props

  handleCreateIssueAction = (issue: string) => {
    this.setState({
      issueStatus: issue,
    })
  }

  handleOnSave = (text: string) => {
    const issue = this.state.issueStatus !== IssueStatus.NONE ? { status: this.state.issueStatus } : null
    this.props.onSave(text, issue)
  }

  render() {
    return (
      <div className="comment-box">
        <div className="comment-box-avatar">
          <Avatar avatar={this.props.loggedUser.slack ? this.props.loggedUser.slack.avatar : ''} />
        </div>
        <div className="comment-box-content" >
          <div className="comment-box-header inline-header" >
            <div className="comment-title"><strong>Write new comment</strong></div>
            <div className="comment-box-actions">
              <IssueMenu issueStatus={this.state.issueStatus} onStatusSelect={this.handleCreateIssueAction} />
            </div>
          </div>
          <RichTextEditor
            onCancel={this.props.onClose}
            onSave={this.handleOnSave}
            cancelButtonTitle={'Cancel'}
            saveButtonTitle={'Add comment'}
          />
        </div>
      </div>
    )
  }
}

export default NewComment
