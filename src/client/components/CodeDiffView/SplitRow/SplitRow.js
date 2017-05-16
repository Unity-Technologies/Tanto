/* flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import InlineCommentThread from 'components/CodeDiffView/InlineCommentThread'
import NewComment from 'components/CodeDiffView/InlineCommentThread/NewComment'

export type Props = {
  leftLine: string,
  rightLine: string,
  isBreak?: boolean,
  leftLineNumber?: any,
  rightLineNumber?: any,
  leftOperation?: string,
  rightOperation?: string,
  leftCssClass: string,
  rightCssClass: string,
  leftComments?: Array<any>,
  rightComments?: Array<any>,
  loggedUser: Object,

  onCreateInlineComment: (lineNumber: string, text: string) => void,
  onUpdateInlineComment: (commentId: string, text: string) => void,
  onDeleteInlineComment: (commentId: string, text: string) => void,
}

class SplitRow extends PureComponent {
  /* eslint-disable react/sort-comp */
  constructor(props: Props) {
    super(props)
    this.state = {
      hoverLeftSide: false,
      hoverRightSide: false,
      leftCommentStarted: false,
      rightCommentStarted: false,
    }
  }

  props: Props

  handleAddLeftComment = () => this.setState({ leftCommentStarted: true })
  handleAddRightComment = () => this.setState({ rightCommentStarted: true })
  handleCloseLeftComment = () => this.setState({ leftCommentStarted: false })
  handleCloseRightComment = () => this.setState({ rightCommentStarted: false })

  mouseOverLeftSide = () => this.setState({ hoverLeftSide: true })
  mouseOverRightSide = () => this.setState({ hoverRightSide: true })
  mouseOutLeftSide = () => this.setState({ hoverLeftSide: false })
  mouseOutRightSide = () => this.setState({ hoverRightSide: false })

  handleOnUpdateInlineComment = (id: string, text: string): any => {
    if (this.props.onUpdateInlineCommment) {
      this.props.onUpdateInlineCommment(id, text)
    }
  }

  handleOnCreateInlineComment = (lineNumber: string) => {
    if (this.props.onCreateInlineComment) {
      return (text: string) => this.props.onCreateInlineComment(lineNumber, text)
    }
    return null
  }

  handleLeftOnSave = (text: string): any => {
    this.setState({
      leftCommentStarted: false,
    })
    if (this.props.onCreateInlineComment) {
      this.props.onCreateInlineComment(`o${this.props.leftLineNumber}`, text)
    }
  }

  handleRightOnSave = (text: string): any => {
    this.setState({
      rightCommentStarted: false,
    })
    if (this.props.onCreateInlineComment) {
      this.props.onCreateInlineComment(`n${this.props.rightLineNumber}`, text)
    }
  }

  render() {
    const {
      leftLine,
      rightLine,
      leftCssClass,
      loggedUser,
      rightCssClass,
      leftOperation,
      rightOperation,
      isBreak,
      leftComments,
      rightComments,
      leftLineNumber,
      rightLineNumber } = this.props
    const codeBreakClass = isBreak ? 'code-break-line' : ''
    const isRightCommented = rightComments && rightComments.length > 0
    const isLeftCommented = leftComments && leftComments.length > 0
    const leftIconStyle = {
      display: this.state.hoverLeftSide ? 'inline-block' : '',
    }
    const rightIconStyle = {
      display: this.state.hoverRightSide ? 'inline-block' : '',
    }

    return (
      <tr className={`code-line ${codeBreakClass}`}>
        <td className="left-side line-number-old">
          <div className={`${leftCssClass}`}>{!isBreak && (leftLineNumber || ' ')}</div>
        </td>
        <td
          onMouseOver={this.mouseOverLeftSide}
          onMouseOut={this.mouseOutLeftSide}
          className={`left-side ${leftCssClass} line-icon`}
        > &nbsp;
          {!isBreak && !isLeftCommented &&
            <i
              onClick={this.handleAddLeftComment}
              className="fa fa-plus-square code-comment-icon code-comment-icon-left"
              aria-hidden="true"
              style={leftIconStyle}
            />
          }
        </td>
        <td
          onMouseOver={this.mouseOverLeftSide}
          onMouseOut={this.mouseOutLeftSide}
          className="left-side diff-operation"
        >
          <div className={`${leftCssClass}`}> {leftOperation || ' '} </div>
        </td>
        <td
          onMouseOver={this.mouseOverLeftSide}
          onMouseOut={this.mouseOutLeftSide}
          className="left-side code-inner"
        >
          <div
            className={`${leftCssClass}`}
            dangerouslySetInnerHTML={{ __html: leftLine || '&nbsp;' }}
          />
          {isLeftCommented &&
            <InlineCommentThread
              comments={leftComments}
              loggedUser={loggedUser}
              onUpdate={this.props.onUpdateInlineComment}
              onDelete={this.props.onDeleteInlineComment}
              onCreate={this.handleOnCreateInlineComment(`o${leftLineNumber}`)}
            />
          }
          {this.state.leftCommentStarted &&
            <div>
              <NewComment loggedUser={loggedUser} onSave={this.handleLeftOnSave} onClose={this.handleCloseLeftComment} />
            </div>
          }
        </td>
        <td className="right-side line-number-new">
          <div className={`${rightCssClass}`}>{!isBreak && (rightLineNumber || ' ')}</div>
        </td>
        <td
          onMouseOver={this.mouseOverRightSide}
          onMouseOut={this.mouseOutRightSide}
          className={`right-side ${rightCssClass} line-icon`}
        >&nbsp;
          {!isBreak && !isRightCommented &&
            <i
              onClick={this.handleAddRightComment}
              className="fa fa-plus-square code-comment-icon code-comment-icon-right"
              aria-hidden="true"
              style={rightIconStyle}
            />
          }
        </td>
        <td
          onMouseOver={this.mouseOverRightSide}
          onMouseOut={this.mouseOutRightSide}
          className="right-side diff-operation"
        >
          <div className={`${rightCssClass}`}> {rightOperation || ' '} </div>
        </td>
        <td
          onMouseOver={this.mouseOverRightSide}
          onMouseOut={this.mouseOutRightSide}
          className="right-side code-inner"
        >
          <div
            className={`${rightCssClass}`}
            dangerouslySetInnerHTML={{ __html: rightLine || '&nbsp;' }}
          />
          {isRightCommented &&
            <InlineCommentThread
              comments={rightComments}
              loggedUser={loggedUser}
              onUpdate={this.props.onUpdateInlineComment}
              onDelete={this.props.onDeleteInlineComment}
              onCreate={this.handleOnCreateInlineComment(`n${rightLineNumber}`)}
            />
          }
          {this.state.rightCommentStarted &&
            <div>
              <NewComment loggedUser={loggedUser} onSave={this.handleRightOnSave} onClose={this.handleCloseRightComment} />
            </div>
          }
        </td>
      </tr>
    )
  }
}

export default SplitRow
