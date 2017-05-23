/* @flow */
import React from 'react'
import PureComponent from 'components/PureComponent'
import type { InlineCommentType } from 'universal/types'
import FormControl from 'react-bootstrap/lib/FormControl'
import Comment from 'components/Comment'
import Avatar from 'components/Avatar'
import NewComment from './NewComment'
import './InlineCommentThread.css'

export type { CommentType } from 'components/Comment'

/* eslint-disable */
export type UserType = {
  username: string,
  slack: $Subtype<{
    avatar: string
  }>
}
/* eslint-enable */

const headerStyle = {
  backgroundColor: '#fbfbfb',
  border: '1px solid #d6d6d6',
}

type Props = {
  comments: Array<InlineCommentType>,
  loggedUser: UserType,
  onUpdate: (id: string, text: string) => void,
  onDelete: (id: string) => void,
  onCreate: (text: string, issue: any) => void,
}

const renderAddNewCommentBox = (loggedUser: UserType, handleOnFocus: Function) => (
  <div className="comment-box">
    <div className="comment-box-avatar">
      <Avatar avatar={loggedUser.slack ? loggedUser.slack.avatar : ''} />
    </div>
    <div className="comment-box-content" >
      <FormControl
        className="reply-box"
        type="text"
        placeholder="Reply..."
        onFocus={handleOnFocus}
      />
    </div>
  </div>
)

export class InlineCommentThread extends PureComponent {
  constructor(props: Props) {
    super(props)

    this.state = {
      editMode: false,
    }
  }

  state: {
    editMode: boolean,
  }

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return nextProps.comments && nextProps.comments.length &&
      super.shouldComponentUpdate(nextProps, nextState)
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

  handleOnSave = (text: string, issue: any): any => {
    this.setState({
      editMode: false,
    })
    if (this.props.onCreate) {
      this.props.onCreate(text, issue)
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
              (<div key={c.id} style={{ marginBottom: '5px' }}>
                <Comment
                  headerStyle={headerStyle}
                  comment={c}
                  canEdit={c.author && loggedUser && c.author.username === loggedUser.username}
                  onDelete={this.handleOnDelete(c.id)}
                  onUpdate={this.handleOnUpdate(c.id)}
                />
              </div>),
            )}
          </div>
        </div>
        {this.state.editMode &&
          <NewComment loggedUser={loggedUser} onSave={this.handleOnSave} onClose={this.handleOnClose} />}
        {!this.state.editMode && renderAddNewCommentBox(loggedUser, this.handleOnFocus)}
      </div>
    )
  }
}


export default InlineCommentThread
