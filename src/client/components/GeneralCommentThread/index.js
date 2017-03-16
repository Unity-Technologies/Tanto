/* @flow */
import React, { Component } from 'react'
import type { GeneralCommentType } from 'universal/types'
import RichTextEditor from 'components/RichTextEditor'
import Avatar from 'components/Avatar'
import Comment from './Comment'

import './GeneralCommentThread.css'

export type UserType = {
  username: string,
  slack: {
    avatar: string
  }
}

type Props = {
  pullRequestId: string,
  repoId: string,
  comments: Array<GeneralCommentType>,
  loggedUser: UserType,
  onUpdate: (id: string, value: string) => void,
  onDelete: (id: string) => void,
  onSave: (repoId: string, pullrequestId: string, value: string) => void,
}

const renderNewComment = (loggedUser: UserType, handleOnSave: Function, handleOnClose: Function) => (
  <div className="comment-box">
    <div className="comment-box-avatar">
      <Avatar avatar={loggedUser.slack ? loggedUser.slack.avatar : null} />
    </div>
    <div className="comment-box-content" >
      <RichTextEditor
        onCancel={handleOnClose}
        onSave={handleOnSave}
        cancelButtonTitle={'Close Pull Request'}
        saveButtonTitle={'Add comment'}
      />
    </div>
  </div>
)

class GeneralCommentThread extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      editMode: false,
    }
  }

  handleOnUpdate = (commentId: string) => {
    if (this.props.onUpdate) {
      return (value) => this.props.onUpdate(commentId, value)
    }
  }

  handleOnDelete = (commentId: string): Function => {
    if (this.props.onDelete) {
      return () => this.props.onDelete(commentId)
    }
  }

  handleOnSave = (value): Function => {
    if (this.props.onSave) {
      this.props.onSave(this.props.repoId, this.props.pullRequestId, value)
    }
  }

  handleOnPullRequestClose = (pullRequestId: string):void => {
    if (this.props.onSave) {
      this.props.onPullRequestClose(this.props.pullRequestId)
    }
  }

  render() {
    return (
      <div>
        <div style={{ position: 'relative' }}>
          <div className="comments-thread-timeline">
            {this.props.comments.map(c =>
              <div className="comments-thread-timeline-item">
                <Comment
                  comment={c}
                  canEdit={c.author.username === this.props.loggedUser.username}
                  onDelete={this.handleOnDelete(c.id)}
                  onUpdate={this.handleOnUpdate(c.id)}
                />
              </div>
            )}
          </div>
        </div>
        {renderNewComment(this.props.loggedUser, this.handleOnSave, this.handleOnPullRequestClose)}
      </div>
    )
  }
}


export default GeneralCommentThread
