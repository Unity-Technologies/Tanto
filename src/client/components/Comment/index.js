/* @flow */
/* eslint-disable react/jsx-indent */

import moment from 'moment'
import React from 'react'
import PureComponent from 'components/PureComponent'
import RichTextEditor from 'components/RichTextEditor'
import Avatar from 'components/Avatar'
import Button from 'react-bootstrap/lib/Button'
import type { GeneralCommentType } from 'universal/types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { IssueStatus } from 'universal/constants'
import './Comment.css'

/* eslint-disable */
export type CommentType = {
  id?: any,
  created: string,
  modified?: string,
  text?: string,
  status?: string,
  author: $Subtype<{
    username: string,
    slack?: {
      avatar: string,
    },
  }>,
  issue?: $Subtype<{
    status: string,
  }>,
  showArrow?: boolean,
  headerStyle?: Object,
}
/* eslint-enable */

export type CommentProps = {
  comment: CommentType,
  canEdit?: boolean,
  disableDelete?: boolean,
  onUpdate?: (value: string) => void,
  onDelete?: () => void,
}

// NOTE: this should be fixed on ONO sideð
export const getStatusText = (status: string): string => {
  switch (status) {
    case 'approved':
    case 'rejected':
      return status
    case 'under_review':
      return 'started reviewing'
    case 'not_reviewed':
      return 'stopped reviewing'
    default:
      return 'commented'
  }
}

// NOTE: this should be fixed on ONO sideð
export const convertResponseIssueStatus = (value: string) => {
  switch (value) {
    case 'later':
      return IssueStatus.FIX_LATER
    case 'next':
      return IssueStatus.FIX_NEXT_PR
    case 'now':
      return IssueStatus.FIX_NOW
    default:
      return value
  }
}

export const getIssueText = (status: string): string => {
  const converted = convertResponseIssueStatus(status)
  switch (converted) {
    case IssueStatus.FIX_LATER:
      return 'added an issue that can be fixed later'
    case IssueStatus.FIX_NEXT_PR:
      return 'added an issue that should be fixed in next PR'
    case IssueStatus.FIX_NOW:
      return 'added an issue that should be fixed in this PR'
    case IssueStatus.FIX_AVAILABLE:
      return 'commented that the fix is available'
    case IssueStatus.FIX_CONFIRMED:
      return 'commented that the fix is confirmed'
    case IssueStatus.OBSOLETE:
      return 'commented that the issue is obsolete'
    default:
      return 'commented'
  }
}


export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return (<Glyphicon glyph="ok-sign" className="comment-status-glyph status-green" />)
    case 'rejected':
      return (<Glyphicon glyph="remove-sign" className="comment-status-glyph status-red" />)
    case 'under_review':
      return (<Glyphicon glyph="eye-open" className="comment-status-glyph status-orange" />)
    default:
      return (<Glyphicon glyph="eye-close" className="comment-status-glyph status-grey" />)
  }
}

export const getIssueIcon = (issueStatus: string, commentStatus?: string) => {
  const converted = convertResponseIssueStatus(issueStatus)
  switch (converted) {
    case IssueStatus.FIX_AVAILABLE:
    case IssueStatus.FIX_CONFIRMED:
    case IssueStatus.OBSOLETE:
      if (commentStatus) {
        return getStatusIcon(commentStatus)
      }
      return <Glyphicon glyph="ok-sign" className="comment-status-glyph status-green" />
    case IssueStatus.FIX_LATER:
      return <i className="fa fa-bug yellow comment-status-glyph" />
    case IssueStatus.FIX_NEXT_PR:
      return <i className="fa fa-bug orange comment-status-glyph" />
    case IssueStatus.FIX_NOW:
      return <i className="fa fa-bug red comment-status-glyph" />
    default:
      return <i className="fa fa-bug comment-status-glyph" />
  }
}


const renderEditMode = (comment: GeneralCommentType, handleOnCancel: Function, handleOnUpdate: Function) => (
  <div className="comment-box">
    <div className="comment-box-avatar">
      <Avatar avatar={comment.author && comment.author.slack ? comment.author.slack.avatar : ''} />
    </div>
    <div className="comment-box-content" >
      <RichTextEditor
        showCancel
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
  (comment: GeneralCommentType,
    canEdit: boolean,
    disableDelete: boolean,
    handleOnEdit: Function,
    handleOnDelete: Function,
    showArrow: any,
    headerStyle: any) => (
      <div className="comment-box">
        <div className="comment-box-avatar">
          <Avatar avatar={comment.author && comment.author.slack ? comment.author.slack.avatar : ''} />
        </div>
        <div className="comment-box-content">
          <div className={`comment-box-header ${showArrow ? 'comment-box-header-arrow' : ''}`} style={headerStyle}>
            <div className="comment-title">
              <strong>{comment.author && comment.author.username}</strong>
              <span>&nbsp;commented&nbsp;{moment(comment.created).fromNow()}</span>
            </div>
            {canEdit &&
              <div className="comment-box-actions">
                <Button
                  className="comment-action-button"
                  onClick={handleOnEdit}
                >
                  <i className="fa fa-pencil " style={{ fontSize: '17px', color: 'rgba(87, 89, 90, 0.69)' }} />
                </Button>
                {!disableDelete &&
                  <Button
                    onClick={handleOnDelete}
                    className="comment-action-button"
                  >
                    <i className="fa fa-trash" style={{ fontSize: '17px', color: 'rgba(87, 89, 90, 0.69)' }} />
                  </Button>
                }
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
      <Avatar avatar={comment.author && comment.author.slack ? comment.author.slack.avatar : ''} />
    </div>
    <div className="comment-box-content">
      <div className="comment-box-header-status">
        <div className="comment-title-status">
          {comment.issue ? getIssueIcon(comment.issue.status, comment.status) : getStatusIcon(comment.status)}
          <div style={{ marginTop: '6px' }}>
            <strong>{comment.author.username}</strong>
            <span>
              &nbsp;
              {comment.issue ? getIssueText(comment.issue.status) : getStatusText(comment.status)}
              &nbsp;
              {moment(comment.created).fromNow()}
            </span>
          </div>
        </div>
        {canEdit &&
          <div className="comment-box-actions-status">
            <Button
              className="comment-action-button"
              onClick={handleOnEdit}
            >
              <i className="fa fa-pencil " style={{ fontSize: '17px', color: 'rgba(87, 89, 90, 0.69)' }} />
            </Button>
          </div>
        }
      </div>
      {comment.text.replace(/\u200B/g, '').trim() &&
        <RichTextEditor text={comment.text} readMode />
      }
    </div>
  </div>
)

class Comment extends PureComponent {
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

    if (this.props.comment.status || this.props.comment.issue) {
      return renderStatusMode(this.props.comment, this.props.canEdit || false, this.handleOnEdit)
    }

    return renderReadMode(
      this.props.comment,
      this.props.canEdit || false,
      this.props.disableDelete || false,
      this.handleOnEdit, this.handleOnDelete,
      this.props.showArrow || false,
      this.props.headerStyle || null)
  }
}

export default Comment
