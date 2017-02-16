// TODO: finish flow annotations

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
import marked from 'marked'
import moment from 'moment'

import type { InlineCommentType } from 'universal/comments' //eslint-disable-line

import './styles.css'

export type Props = {
  loggedUsername: string,
  comment: InlineCommentType,
  onoStyle?: boolean,
  markdown?: boolean,
  hideSettings?: boolean,
  hideHeader?: boolean,
  customHeader?: string,
  onCommentSave: Function,
  onCommentCancel: Function,
  onCommentDelete: Function,
}

function escapeHTML(text) {
  const escape = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    '\'': '&apos;',
  }
  return text.replace(/[&<>"'\\]/g, (char) => escape[char])
}


function linkifyRevisionHashes(text) {
  return text.replace(/([a-f0-9]{12}|[a-f0-9]{40})/, (hash) => (
    `<a href="${hash}">${hash}</a>`
  ))
}


class Comment extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: Props) {
    super(props)
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
    })
    const rendered = this.renderCommentText(props.comment.text, props)
    this.state = {
      editMode: props.newComment,
      newComment: props.newComment,
      commentText: props.comment.text,
      renderedText: rendered,
    }
  }

  props: Props

  formatOnoText(text) {
    let formatted = escapeHTML(text)
    formatted = formatted.replace(/@([a-z]+)/g, '<b>@$1</b>')
    formatted = linkifyRevisionHashes(formatted)
    // TODO add urlification of urls, revision hashes, and cases
    return formatted
  }

  formatMarkdown(text) {
    let formatted = marked(text)
    formatted = linkifyRevisionHashes(formatted)
    return formatted
  }

  onCommentEdit = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  onCommentDelete = () => {
    this.props.onCommentDelete()
  }

  onCommentCancel = () => {
    if (this.state.newComment) {
      this.props.onCommentCancel()
    }
    this.setState({
      editMode: false,
      newComment: false,
      commentText: this.props.comment.text,
    })
  }

  onCommentSave = () => {
    this.setState({
      editMode: false,
      newComment: false,
      renderedText: this.renderCommentText(this.state.commentText, this.props),
    })
    this.props.onCommentSave(this.comment.id, this.state.commentText)
    // TODO: Figure out proper API for onCommentSave
  }

  renderStatusPanelContent(comment, statusChangeString) {
    return (
      <span><strong>{comment.author.fullName}</strong> {statusChangeString} these changes {moment(comment.created).fromNow()}.</span>
    )
  }

  renderCommentText(text, { markdown, onoStyle }) {
    if (text && onoStyle) {
      return { __html: this.formatOnoText(text) }
    } else if (text && markdown) {
      return { __html: this.formatMarkdown(text) }
    }
    return text
  }

  renderStatusPanel(comment) {
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
        <Col md="12">
          <Alert className="comment-status-panel" bsStyle={bsStyle}>
            {this.renderStatusPanelContent(comment, statusChangeString)}
          </Alert>
        </Col>
      </Row>
    )
  }

  renderCommentHeader({ comment, newComment, hideHeader, customHeader }, isAuthor) {
    const buttonSize = 'small'
    if (newComment || hideHeader) {
      return ''
    }
    return (
      <Row>
        <Col md={8}>
          <span className="comment-header-text">
            <strong>{comment.author.fullName}</strong> commented {moment(comment.created).fromNow()}
          </span>
        </Col>
        <Col md={4} mdOffset={0}>
           {isAuthor &&
             <ButtonToolbar
               className="comment-header-buttons pull-right"
             >
               <Button
                 onClick={this.onCommentEdit}
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

  renderCustomText({ comment }, text) {
    return text
      .replace('{time}', moment(comment.created).fromNow())
      .replace('{fullName}', comment.author.fullName)
  }

  renderCommentBody({ markdown, onoStyle }) {
    if (markdown) {
      return (
        <span
          className="comment-body-markdown"
          dangerouslySetInnerHTML={this.state.renderedText}
        />)
    }
    if (onoStyle) {
      return (
        <span
          className="comment-body-onostyle"
          dangerouslySetInnerHTML={this.state.renderedText}
        />
      )
    }
    return (
      <span className="comment-body-onostyle">
        {this.state.renderedText}
      </span>
    )
  }

  renderComment() {
    const {
      loggedUsername,
      comment,
      simpleText,
    } = this.props

    const { editMode } = this.state
    const isAuthor = loggedUsername === comment.author.username
    const placeholder = 'Write comment text here.'
    return (
      <Row>
        <Col md={1}>
                <Avatar {...comment.author.slack} />
        </Col>
        <Col md={11}>
          <Panel
            header={this.renderCommentHeader(this.props,
                                             isAuthor)}
          >
            <Grid fluid>
              <Row>
                {!editMode && this.renderCommentBody(this.props)}
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
                          simpleText={simpleText}
                          hideStyleControls
                        />
                      </Well>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ButtonToolbar>
                        <Button onClick={this.onCommentSave}>
                          Save
                        </Button>
                        <Button onClick={this.onCommentCancel}>
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
          {this.props.comment.status && this.renderStatusPanel(this.props.comment)}
          {(this.props.comment.text || this.props.newComment)
           && this.renderComment()}
      </Grid>
    )
  }
}

export default Comment
