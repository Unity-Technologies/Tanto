// TODO: add flow annotations

import React, { Component } from 'react'
import { NewComment, Comment } from 'components'
import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'

export type Props = {
  line: string,
  isBreak: boolean,
  oldLineNumber: any,
  newLineNumber: any,
  operation: string,
  cssClass: string,
  comments?: Array<any>,
  collapseComments?: boolean,
  onComment?: Function,
};

class UnifiedRow extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: Props) {
    super(props)
    this.state = {
      commentState: false,
      commentText: '',
      commentsCollapsed: false || props.collapseComments,
    }
    this.addComment = this.addComment.bind(this)
    this.cancelComment = this.cancelComment.bind(this)
    this.collapseComments = this.collapseComments.bind(this)
    this.handleCommentSave = this.handleCommentSave.bind(this)
  }

  props: Props

  componentWillReceiveProps(nextProps) {
    this.setState({
      commentsCollapsed: this.commentsCollapsed && nextProps.collapseComments,
    })
  }

  addComment() {
    this.setState({
      commentState: true,
    })
  }

  cancelComment() {
    this.setState({
      commentState: false,
    })
  }

  collapseComments() {
    this.setState({
      commentsCollapsed: !this.state.commentsCollapsed,
    })
  }

  handleCommentSave() {
    this.setState({
      commentState: false,
    })

    if (this.props.onComment) {
      const line = this.props.oldLineNumber || this.props.newLineNumber
      this.props.onComment(line, this.state.commentText)
    }
  }

  render() {
    const {
      line,
      cssClass,
      operation,
      isBreak,
      newLineNumber,
      oldLineNumber,
      comments,
    } = this.props
    const codeBreakClass = isBreak ? 'code-break-line' : ''
    const isCommented = comments.length > 0

    return (
      <tr className={`code-line ${codeBreakClass}`}>
        <td className="line-number-old">
          <div className={`${cssClass}`}>{!isBreak && (oldLineNumber || ' ')}</div>
        </td>
        <td className="line-number-new">
          <div className={`${cssClass}`}>{!isBreak && (newLineNumber || ' ')}</div>
        </td>
        <td className={`${cssClass} line-icon`}>
          {!isBreak && !isCommented && !this.state.commentState &&
            <i
              onClick={() => this.addComment(line)}
              className="fa fa-plus-square code-comment-icon code-comment-icon-hover"
              aria-hidden="true"
            />
          }
          {isCommented &&
            <i
              className="fa fa-comment code-comment-thread"
              aria-hidden="true"
              onClick={this.collapseComments}
            />
          }
        </td>
        <td className="diff-operation">
          {operation &&
            <div className={`${cssClass}`}> {operation} </div>
          }
        </td>
        <td className="code-inner">

          <div className={`${cssClass}`} dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />
          {isCommented && !this.state.commentsCollapsed &&
            <div className="code-line-comment">
              {comments.map(comment => (
                <Comment
                  simpleText
                  key={_.uniqueId('_code_comment')}
                  {...comment}
                />
              ))}
            {!this.state.commentState &&
              <RaisedButton
                label="Add Comment"
                backgroundColor="#d9edf7"
                style={{ marginRight: '10px' }}
                onClick={() => this.addComment(line)}
              />
            }
            </div>
          }
          {this.state.commentState &&
            <div className="code-line-comment">
              <NewComment
                onCancel={this.cancelComment}
                onComment={text => this.handleCommentSave(line, text)}
              />
            </div>
          }
        </td>
      </tr>
    )
  }
}

export default UnifiedRow
