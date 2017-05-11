/* @flow */
import React, { Component } from 'react'
import type { GeneralCommentType } from 'universal/types'
import NewComment from './NewComment'
import Comment from './Comment'
import type { CommentType } from './Comment'
export type { CommentType } from './Comment'
import './GeneralCommentThread.css'

export type UserType = {
  username: string,
  slack: {
    avatar: string
  }
}

type Props = {
  pullRequestId: string,
  repoName: string,
  isOwner: boolean,
  comments: Array<GeneralCommentType>,
  loggedUser: UserType,
  description: CommentType,
  onUpdate: (id: string, value: string) => void,
  onDelete: (id: string) => void,
  onSave: (repoName: string, pullrequestId: string, value: string) => void,
  onDescriptionUpdate: (pullrequestId: string, value: string) => void,
  onPullRequestClose: (repoName: string, pullrequestId: string) => void,
}

const renderDescriptionComment =
  (description: CommentType, loggedUser: UserType, handleOnDescriptionUpdate: Function) => (
    <Comment
      comment={description}
      disableDelete
      canEdit={description.author ? description.author.username === loggedUser.username : false}
      onUpdate={handleOnDescriptionUpdate}
    />
  )

class GeneralCommentThread extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      editMode: false,
    }
  }

  state: {
    editMode: boolean
  }

  handleOnUpdate = (commentId: string): any => {
    if (this.props.onUpdate) {
      return (value: string) => this.props.onUpdate(commentId, value)
    }
    return null
  }

  handleOnDelete = (commentId: string): any => {
    if (this.props.onDelete) {
      return () => this.props.onDelete(commentId)
    }
    return null
  }

  handleOnSave = (text: string, status?: string, issue?: any): any => {
    if (this.props.onSave) {
      this.props.onSave(this.props.repoName, this.props.pullRequestId, text, status, issue)
    }
  }

  handleOnPullRequestClose = (pullRequestId: string) => {
    if (this.props.onPullRequestClose) {
      this.props.onPullRequestClose(this.props.repoName, this.props.pullRequestId)
    }
  }

  handleOnDescriptionUpdate = (value: string): any => {
    if (this.props.onDescriptionUpdate) {
      this.props.onDescriptionUpdate(this.props.pullRequestId, value)
    }
  }

  render() {
    return (
      <div>
        <div style={{ position: 'relative' }}>
          <div className="comments-thread-timeline">
            {this.props.description &&
              renderDescriptionComment(this.props.description, this.props.loggedUser, this.handleOnDescriptionUpdate)}
            {this.props.comments.map(c =>
              <div key={c.id} className="comments-thread-timeline-item">
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
        <div style={{ marginTop: '10px' }}>
          <NewComment
            isOwner={this.props.isOwner}
            loggedUser={this.props.loggedUser}
            onSave={this.handleOnSave}
            onCancel={this.handleOnPullRequestClose}
          />
        </div>
      </div>
    )
  }
}


export default GeneralCommentThread
