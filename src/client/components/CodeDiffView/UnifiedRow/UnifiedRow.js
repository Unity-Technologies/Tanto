/* flow */
/* eslint-disable  */

import React from 'react'
import PureComponent from 'components/PureComponent'
import InlineCommentThread from 'components/CodeDiffView/InlineCommentThread'
import NewComment from 'components/CodeDiffView/InlineCommentThread/NewComment'

export type Props = {
  line: string,
  isBreak: boolean,
  oldLineNumber: any,
  newLineNumber: any,
  operation: string,
  cssClass: string,
  comments: Array<any>,
  loggedUser: Object,

  onCreateInlineComment: (lineNumber: string, text: string, issue: any) => void,
  onUpdateInlineComment: (commentId: string, text: string) => void,
  onDeleteInlineComment: (commentId: string) => void,
}

class UnifiedRow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      newCommentStarted: false,
    }
  }

  props: Props

  addComment = () => {
    this.setState({
      newCommentStarted: true,
    })
  }

  handleOnClose = (): any => {
    this.setState({
      newCommentStarted: false,
    })
  }

  getLineNumber = () => (this.props.newLineNumber ? `n${this.props.newLineNumber}` : `o${this.props.oldLineNumber}`)
  handleOnSave = (text: string): any => {
    this.setState({
      newCommentStarted: false,
    })
    if (this.props.onCreateInlineComment) {
      this.props.onCreateInlineComment(this.getLineNumber(), text)
    }
  }

  handleOnCreateInlineComment = () => {
    if (this.props.onCreateInlineComment) {
      return (text: string, issue: any) => this.props.onCreateInlineComment(this.getLineNumber(), text, issue)
    }
    return null
  }

  render() {
    const {
      line,
      cssClass,
      operation,
      isBreak,
      newLineNumber,
      loggedUser,
      oldLineNumber,
      comments,
    } = this.props
    const codeBreakClass = isBreak ? 'code-break-line' : ''
    const isCommented = comments && comments.length > 0

    return (
      <tr className={`code-line ${codeBreakClass}`}>
        <td className="line-number-old">
          <div className={`${cssClass}`}>{!isBreak && (oldLineNumber || ' ')}</div>
        </td>
        <td className="line-number-new">
          <div className={`${cssClass}`}>{!isBreak && (newLineNumber || ' ')}</div>
        </td>
        <td className={`${cssClass} line-icon`}>
          {!isBreak && !isCommented && !this.state.newComment &&
            <i
              onClick={this.addComment}
              className="fa fa-plus-square code-comment-icon code-comment-icon-hover"

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
          {isCommented &&
            <InlineCommentThread
              comments={comments}
              loggedUser={loggedUser}
              onUpdate={this.props.onUpdateInlineComment}
              onDelete={this.props.onDeleteInlineComment}
              onCreate={this.handleOnCreateInlineComment()}
            />}
          {this.state.newCommentStarted &&
            <div>
              <NewComment loggedUser={loggedUser} onSave={this.handleOnSave} onClose={this.handleOnClose} />
            </div>
          }
        </td>
      </tr>
    )
  }
}

export default UnifiedRow
