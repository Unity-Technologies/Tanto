/* @flow */
import moment from 'moment'
import React, { Component } from 'react'
import RichTextEditor from 'components/RichTextEditor'
import Avatar from 'components/Avatar'
import Button from 'react-bootstrap/lib/Button'

import type { GeneralCommentType } from 'universal/types'
import './Comment.css'


export type CommentType = {
  id?: any,
  created: string,
  modified?: string,
  text?: string,
  location?: {
    lineNumber: string,
    filePath: string,
  },
  author: {
    username: string,
    slack?: {
      avatar: string,
    },
  }
}

export type CommentProps = {
  comment: CommentType,
  canEdit?: boolean,
  disableDelete?: boolean,
  onUpdate?: (value: string) => void,
  onDelete?: () => void,
}

const renderEditMode = (comment: GeneralCommentType, handleOnCancel: Function, handleOnUpdate: Function) => (
  <div className="inline-comment-box">
    <div className="inline-comment-box-avatar">
      <Avatar avatar={comment.author.slack ? comment.author.slack.avatar : ''} />
    </div>
    <div className="inline-comment-box-content" >
      <RichTextEditor
        text={comment.text}
        onCancel={handleOnCancel}
        onSave={handleOnUpdate}
        cancelButtonTitle={'Close'}
        saveButtonTitle={'Update comment'}
      />
    </div>
  </div>
)

const renderReadMode =
  (comment: GeneralCommentType, canEdit: boolean, disableDelete: boolean, handleOnEdit: Function, handleOnDelete: Function) => (
    <div className="inline-comment-box">
      <div className="inline-comment-box-avatar inline-comments-thread-timeline-item">
        <Avatar avatar={comment.author.slack ? comment.author.slack.avatar : ''} />
      </div>
      <div className="inline-comment-box-content">
        <div className="inline-comment-box-header">
          <div className="inline-comment-title">
            <strong>{comment.author.username}</strong>
            <span>&nbsp;commented&nbsp;{moment(comment.created).fromNow()}</span>
          </div>
          {canEdit &&
            <div className="inline-comment-box-actions">
              <Button
                className="inline-comment-action-button"
                onClick={handleOnEdit}
              >
                <i className="fa fa-pencil " style={{ fontSize: '17px', color: 'rgba(87, 89, 90, 0.69)' }} aria-hidden="true"></i>
              </Button>
              {!disableDelete &&
                <Button
                  onClick={handleOnDelete}
                  className="inline-comment-action-button"
                >
                  <i className="fa fa-trash" style={{ fontSize: '17px', color: 'rgba(87, 89, 90, 0.69)' }} aria-hidden="true"></i>
                </Button>
              }
            </div>
          }
        </div>
        <RichTextEditor text={comment.text} readMode />
      </div>
    </div>
  )


class Comment extends Component {
  constructor(props: CommentProps) {
    super(props)

    this.state = {
      editMode: false,
    }
  }

  state: {
    editMode: boolean
  }

  props: CommentProps

  handleOnCancel = () => {
    this.setState({ editMode: false })
  }

  handleOnUpdate = (value: string): void => {
    this.setState({ editMode: false })
    if (this.props.onUpdate) {
      this.props.onUpdate(value)
    }
  }

  handleOnEdit = (): void => {
    this.setState({ editMode: true })
  }

  handleOnDelete = (): void => {
    if (this.props.onDelete) {
      this.props.onDelete()
    }
  }

  render() {
    if (this.state.editMode) {
      return renderEditMode(this.props.comment, this.handleOnCancel, this.handleOnUpdate)
    }

    return renderReadMode(
      this.props.comment, this.props.canEdit || false, this.props.disableDelete || false, this.handleOnEdit, this.handleOnDelete)
  }
}

export default Comment
