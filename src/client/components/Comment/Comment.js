// TODO: finish flow annotations

import React, { Component } from 'react'
import TextEditorBox from 'components/TextEditorBox'
import Icon from 'components/Icon'
import Avatar from 'components/Avatar'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Settings from 'material-ui/svg-icons/action/settings'
import Grid from 'react-bootstrap/lib/Grid' 
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Well from 'react-bootstrap/lib/Well'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Close from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'
import Alert from 'react-bootstrap/lib/Alert'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import marked from 'marked'
import moment from 'moment'

import type { InlineCommentType } from 'universal/comments' //eslint-disable-line

import './styles.css'

export type Props = {
  loggedUsername: string,
  comment: InlineCommentType,
  simpleText?: boolean,
  style?: Object,
  headerStyle?: Object,
  buttonGroupStyle?: Object,
  niceToHave?: boolean,
  codeStyle?: boolean,
  hideSettings?: boolean,
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
    this.state = {
      editMode: props.newComment,
      newComment: props.newComment,
      commentText: props.comment.text,
      renderedText: this.renderText(props.comment.text),
    }
  }

  props: Props

  onCommentEdit = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  onCommentCancel = () => {
    this.setState({
      editMode: false,
      newComment: false,
      commentText: this.props.comment.text,
    })
    // TODO: unmount component if this is a new comment.
  }
  // onCommentDelete() {
  //   // TODO: dispatch reducer action to delete comment
  // }

  onCommentSave = () => {
    this.setState({
      editMode: false,
      newComment: false,
      renderedText: this.renderText(this.state.commentText),
    })
    // TODO: dispatch reducer action to save edited and new comments
  }

  // handleChange(event, value) {
  //   switch (value) {
  //     case '1':
  //       this.setState({
  //         issue: !this.state.issue,
  //       })
  //       return
  //     case '2':
  //       this.setState({
  //         niceToHave: !this.state.niceToHave,
  //       })
  //       return
  //     case '3':
  //       this.setState({
  //         codeStyle: !this.state.codeStyle,
  //       })
  //       return
  //     default:
  //       return
  //   }
  // }
  renderStatusPanelContent(comment, statusChangeString) {
    return (
      <span><strong>{comment.author.fullName}</strong> {statusChangeString} these changes {moment(comment.created).fromNow()}.</span>
    )
  }

  renderText(text) {
    if (text) {
      return { __html: marked(text) }
    }
    return { __html: '' }
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
        <Alert bsStyle={bsStyle}>
          {this.renderStatusPanelContent(comment, statusChangeString)}
        </Alert>
    )
  }

  renderCommentHeader(fullName, created, isAuthor) {
    return (
      <Row>
        <Col md={4}>
          <span className="header-text">
            <strong>{fullName}</strong> commented {moment(created).fromNow()}
          </span>
        </Col>
        <Col md={4} mdOffset={4}>
           {isAuthor &&
             <ButtonToolbar className="pull-right">
               <Button onClick={this.onCommentEdit}>
                 <Glyphicon glyph="edit" />
               </Button>
               <Button>
                 <Glyphicon glyph="remove" />
               </Button>
             </ButtonToolbar>
           }
        </Col>
      </Row>
    )
  }
  renderComment() {

    const {
      loggedUsername,
      comment,
      style,
      simpleText,
      headerStyle,
      buttonGroupStyle,
    } = this.props
    
    const { editMode, newComment } = this.state
    const isAuthor = loggedUsername === comment.author.username
    const placeholder = newComment ? 'Write comment text here.' : null

    return (
      <Col>
        <Row>
          <Col md={1}>
                <Avatar {...comment.author.slack} />
          </Col>
          <Col md={11}>
            <Panel header={this.renderCommentHeader(comment.author.fullName, comment.created, isAuthor)}>
              {!editMode && <span className="comment-text" dangerouslySetInnerHTML={this.state.renderedText}></span>}
              {editMode &&
                <Col md={12}>
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
                </Col>
              }
            </Panel>
          </Col>
        </Row>
      </Col>
    )
  }
  render() {
    if (!this.props.comment || !this.props.comment.author) {
      return null
    }

    return (
      <Col md={12} className="comment-frame">
        <Row>
          {this.props.comment.status && this.renderStatusPanel(this.props.comment)}
        </Row>
        <Row>
          {this.props.comment.text && this.renderComment()}
        </Row>
      </Col>
    )
  }
}

export default Comment
