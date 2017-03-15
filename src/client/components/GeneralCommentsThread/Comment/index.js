/* @flow */
import moment from 'moment'
import React, { Component } from 'react'
import RichTextEditor from 'components/RichTextEditor'
import Avatar from 'components/Avatar'
import Button from 'react-bootstrap/lib/Button'
import type { GeneralCommentType } from 'universal/types'
import './Comment.css'

type Props = {
  comment: GeneralCommentType,
  canEdit: boolean,
  onUpdate: (id: string, value: string) => void,
  onDelete: (id: string) => void,
}

export const getStatusText = (status) => {
  switch (status) {
    case 'approved':
    case 'rejected':
      return status
    case 'under_review':
      return 'started reviewing'
    default:
      return 'stopped reviewing'
  }
}

export const getStatusIcon = (status) => {
  let iconName
  let color
  switch (status) {
    case 'approved':
      iconName = 'fa-check-circle'
      color = 'green'
      break
    case 'rejected':
      iconName = 'fa-times-circle'
      color = 'red'
      break
    case 'under_review':
      iconName = 'fa-eye'
      color = 'orange'
      break
    default:
      iconName = 'fa-eye-slash'
      color = 'grey'
      break
  }

  return (
    <i className={`fa ${iconName} comment-status-icon`} aria-hidden="true" style={{ color }}></i>
  )
}

const renderEditMode = (comment: GeneralCommentType, handleOnCancel: Function, handleOnUpdate: Function) => (
  <div className="comment-box">
    <div className="comment-box-avatar">
      <Avatar avatar={comment.author.slack.avatar} />
    </div>
    <div className="comment-box-content" >
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

const renderReadMode = (comment: GeneralCommentType, canEdit: boolean, handleOnEdit: Function, handleOnDelete: Function) => (
  <div className="comment-box">
    <div className="comment-box-avatar">
      <Avatar avatar={comment.author.slack.avatar} />
    </div>
    <div className="comment-box-content">
      <div className="comment-box-header">
        <div className="comment-title">
          <strong>{comment.author.username}</strong>
          <span>&nbsp;commented&nbsp;{moment(comment.created).fromNow()}</span>
        </div>
        {canEdit &&
          <div className="comment-box-actions">
            <Button
              className="comment-action-button"
              onClick={handleOnEdit}
            >
              <i className="fa fa-pencil " style={{ fontSize: '17px', color: 'rgba(87, 89, 90, 0.69)' }} aria-hidden="true"></i>
            </Button>

            <Button
              onClick={handleOnDelete}
              className="comment-action-button"
            >
              <i className="fa fa-trash" style={{ fontSize: '17px', color: 'rgba(87, 89, 90, 0.69)' }} aria-hidden="true"></i>
            </Button>
          </div>
        }
      </div>
      <RichTextEditor text={comment.text} readMode />
    </div>
  </div>
)

const renderStatusMode = (comment: GeneralCommentType, canEdit: boolean, handleOnEdit: Function) => (
  <div className="comment-box">
    <div className="comment-box-avatar">
      <Avatar avatar={comment.author.slack.avatar} />
    </div>
    <div className="comment-box-content">
      <div className="comment-box-header-status">
        <div className="comment-title-status">
          {getStatusIcon(status)}
          <div style={{ marginTop: '3px' }}>
            <strong>{comment.author.username}</strong>
            <span>&nbsp;{getStatusText(comment.status)}&nbsp;{moment(comment.created).fromNow()}</span>
          </div>
        </div>
        {canEdit &&
          <div className="comment-box-actions">
            <Button
              className="comment-action-button"
              onClick={handleOnEdit}
            >
              <i className="fa fa-pencil " style={{ fontSize: '17px', color: 'rgba(87, 89, 90, 0.69)' }} aria-hidden="true"></i>
            </Button>
          </div>
        }
      </div>
      {comment.text &&
        <RichTextEditor text={comment.text} readMode />
      }
    </div>
  </div>
)

class Comment extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      editMode: false,
    }
  }

  props: Props

  handleOnCancel = () => {
    this.setState({ editMode: false })
  }

  handleOnUpdate = (value) => {
    this.setState({ editMode: false })
    if (this.props.onUpdate) {
      this.props.onUpdate(this.props.comment.id, value)
    }
  }

  handleOnEdit = () => {
    this.setState({ editMode: true })
  }

  handleOnDelete = () => {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.comment.id)
    }
  }

  render() {
    if (this.state.editMode) {
      return renderEditMode(this.props.comment, this.handleOnCancel, this.handleOnUpdate)
    }

    if (this.props.comment.status) {
      return renderStatusMode(this.props.comment, this.props.canEdit, this.handleOnEdit)
    }

    return renderReadMode(this.props.comment, this.props.canEdit, this.handleOnEdit, this.handleOnDelete)
  }
}

export default Comment
