/* @flow */

import React, { Component } from 'react'
import TextEditorBox from 'components/TextEditorBox'
import Avatar from 'components/Avatar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Well from 'react-bootstrap/lib/Well'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'
import Alert from 'react-bootstrap/lib/Alert'
import moment from 'moment'
import { formatOnoText, formatMarkdown } from 'utils/text'
import type { InlineCommentType } from 'universal/types' //eslint-disable-line

import './styles.css'

export type Props = {
  loggedUsername: string,
  comment: InlineCommentType,
  onoStyle?: boolean,
  markdown?: boolean,
  hideSettings?: boolean,
  hideHeader?: boolean,
  newComment?: boolean,
  handleCommentSave?: Function,
  handleCommentCancel?: Function,
  handleCommentDelete?: Function,
}

export type State = {
  editMode: boolean,
  newComment: boolean,
  commentText: string,
  renderedText: string | Object,
}

function StatusPanel({ comment }) {
  let statusChangeString
  let bsStyle
  switch (comment.status) {
    case 'approved':
      bsStyle = 'success'
      statusChangeString = comment.status
      break
    case 'rejected':
      bsStyle = 'danger'
      statusChangeString = comment.status
      break
    case 'under_review':
      bsStyle = 'warning'
      statusChangeString = 'started reviewing'
      break
    default:
      bsStyle = 'default'
      statusChangeString = 'stopped reviewing'
  }
  return (
    <Row>
      <Col md={12}>
        <Alert className="comment-status-panel" bsStyle={bsStyle}>
          <strong>{comment.author.fullName}</strong> {statusChangeString} these changes {moment(comment.created).fromNow()}.
        </Alert>
      </Col>
    </Row>
  )
}

function CommentHeader(props) {
  const { comment,
          showButtons,
          handleCommentEdit } = props

  const buttonSize = 'small'
  return (
    <Row>
      <Col md={8}>
        <span className="comment-header-text">
          <strong>{comment.author.fullName}</strong> commented {moment(comment.created).fromNow()}
        </span>
      </Col>
      <Col md={4} mdOffset={0}>
        {showButtons &&
          <ButtonToolbar
            className="comment-header-buttons pull-right"
          >
            <Button
              onClick={handleCommentEdit}
              bsSize={buttonSize}
            >
              <Glyphicon glyph="edit" />
            </Button>
            <Button
              bsSize={buttonSize}
            >
              <Glyphicon glyph="remove" />
            </Button>
          </ButtonToolbar>
        }
      </Col>
    </Row>
  )
}

function CommentBody(props) {
  if (props.markdown) {
    return (
      <span
        className="comment-body-markdown"
        dangerouslySetInnerHTML={props.children}
      />)
  }
  if (props.onoStyle) {
    return (
      <span
        className="comment-body-onostyle"
        dangerouslySetInnerHTML={props.children}
      />
    )
  }
  return (
    <span className="comment-body-onostyle">
      {props.children}
    </span>
  )
}

class Comment extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: Props) {
    super(props)
    const rendered = this.renderCommentText(props.comment.text, props.markdown, props.onoStyle)
    this.state = {
      editMode: props.newComment || false,
      newComment: props.newComment || false,
      commentText: props.comment.text,
      renderedText: rendered,
    }
  }
  props: Props
  state: State
  handleCommentEdit = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  handleCommentDelete = () => {
    if (this.props.handleCommentDelete) {
      this.props.handleCommentDelete()
    }
  }

  handleCommentCancel = () => {
    if (this.state.newComment && this.props.handleCommentCancel) {
      this.props.handleCommentCancel()
    }
    this.setState({
      editMode: false,
      newComment: false,
      commentText: this.props.comment.text,
    })
  }

  handleCommentSave = () => {
    if (this.props.handleCommentSave) {
      this.props.handleCommentSave(this.props.comment.id, this.state.commentText)
    }

    if (this.state.newComment) {
      this.setState({
        commentText: '',
      })
    } else {
      this.setState({
        editMode: false,
        renderedText: this.renderCommentText(this.state.commentText, this.props.markdown, this.props.onoStyle),
      })
    }

    // TODO: Figure out proper API for handleCommentSave
  }

  renderCommentText(text:string, markdown: boolean = false, onoStyle: boolean = false) {
    if (text && onoStyle) {
      return { __html: formatOnoText(text) }
    } else if (text && markdown) {
      return { __html: formatMarkdown(text) }
    }
    return text
  }

  renderComment() {
    const {
      loggedUsername,
      comment,
      newComment,
      hideHeader,
      onoStyle,
      markdown,
    } = this.props

    const { editMode } = this.state
    const isAuthor = loggedUsername === comment.author.username
    const placeholder = 'Write comment text here.'

    const header = !newComment && !hideHeader && (
      <CommentHeader
        showButtons={isAuthor}
        handleCommentEdit={this.handleCommentEdit}
        comment={comment}
      />)

    return (
      <Row>
        <Col md={1}>
          <Avatar {...comment.author.slack} />
        </Col>
        <Col md={11}>
          <Panel
            header={header}
          >
            <Grid fluid>
              <Row>
                {!editMode &&
                  <CommentBody onoStyle={onoStyle} markdown={markdown}>
                    {this.state.renderedText}
                  </CommentBody>}
              </Row>
              {editMode &&
                <div>
                  <Row>
                    <Col>
                      <Well>
                        <TextEditorBox
                          onTextChanged={(value) => { this.setState({ commentText: value }) }}
                          text={this.state.commentText}
                          placeholder={placeholder}
                          readOnly={!editMode}
                          simpleText
                          hideStyleControls
                        />
                      </Well>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ButtonToolbar>
                        <Button onClick={this.handleCommentSave}>
                          Save
                        </Button>
                        <Button onClick={this.handleCommentCancel}>
                          Cancel
                        </Button>
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </div>
              }
            </Grid>
          </Panel>
        </Col>
      </Row>
    )
  }
  render() {
    if (!this.props.comment || !this.props.comment.author) {
      return null
    }
    return (
      <Grid className="comment-frame">
          {this.props.comment.status && <StatusPanel comment={this.props.comment} />}
          {(this.props.comment.text || this.props.newComment)
           && this.renderComment()}
      </Grid>
    )
  }
}

export default Comment
