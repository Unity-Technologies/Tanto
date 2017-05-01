/* @flow */
import React, { Component } from 'react'
import type { InlineCommentType } from 'universal/types'
import FormControl from 'react-bootstrap/lib/FormControl'
import Comment from './Comment'
import NewComment from './NewComment'
import Avatar from 'components/Avatar'
export type { CommentType } from './Comment'
import './InlineCommentThread.css'

export type UserType = {
  username: string,
  slack: {
    avatar: string
  }
}

type Props = {
  comments: Array<InlineCommentType>,
  loggedUser: UserType,
  onUpdate: (id: string, text: string) => void,
  onDelete: (id: string) => void,
  onCreate: (text: string) => void,
}

const renderAddNewCommentBox = (loggedUser: UserType, handleOnFocus: Function) => (
  <div className="inline-comment-box">
    <div className="inline-comment-box-avatar">
      <Avatar avatar={loggedUser.slack ? loggedUser.slack.avatar : ''} />
    </div>
    <div className="inline-comment-box-content" >
      <FormControl
        className="reply-box"
        type="text"
        placeholder="Reply..."
        onFocus={handleOnFocus}
      />
    </div>
  </div>
)

class InlineCommentThread extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      editMode: false,
    }
  }

  state: {
    editMode: boolean,
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

  handleOnSave = (text: string): any => {
    this.setState({
      editMode: false,
    })
    if (this.props.onCreate) {
      this.props.onCreate(text)
    }
  }

  handleOnFocus = (): any => {
    this.setState({
      editMode: true,
    })
  }

  handleOnClose = (): any => {
    this.setState({
      editMode: false,
    })
  }

  render() {
    const { loggedUser } = this.props
    return (
      <div className="inline-comments-thread">
        <div style={{ position: 'relative' }}>
          <div className="inline-comments-thread-timeline">
            {this.props.comments.map(c =>
              <div key={c.id}>
                <Comment
                  comment={c}
                  canEdit={c.author && loggedUser && c.author.username === loggedUser.username}
                  onDelete={this.handleOnDelete(c.id)}
                  onUpdate={this.handleOnUpdate(c.id)}
                />
              </div>
            )}
          </div>
        </div>
        {this.state.editMode &&
          <NewComment loggedUser={loggedUser} handleOnSave={this.handleOnSave} handleOnClose={this.handleOnClose} />}
        {!this.state.editMode && renderAddNewCommentBox(loggedUser, this.handleOnFocus)}
      </div>
    )
  }
}


export default InlineCommentThread
