// TODO: finish flow annotations

import React, { Component } from 'react'
import Comment from 'components/Comment'
import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'

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
  onComment?: Function,
  collapseComments?: boolean,
}

class SplitRow extends Component {
  /* eslint-disable react/sort-comp */
  constructor(props: Props) {
    super(props)
    this.state = {
      leftCommentState: false,
      rightCommentState: false,
      hoverLeftSide: false,
      hoverRightSide: false,
      leftCommentsCollapsed: false || props.collapseComments,
      rightCommentsCollapsed: false || props.collapseComments,
    }
    this.addLeftComment = this.addLeftComment.bind(this)
    this.addRightComment = this.addRightComment.bind(this)
    this.mouseOverLeftSide = this.mouseOverLeftSide.bind(this)
    this.mouseOverRightSide = this.mouseOverRightSide.bind(this)
    this.mouseOutLeftSide = this.mouseOutLeftSide.bind(this)
    this.mouseOutRightSide = this.mouseOutRightSide.bind(this)
    this.cancelComment = this.cancelComment.bind(this)
    this.collapseLeftComments = this.collapseLeftComments.bind(this)
    this.collapseRightComments = this.collapseRightComments.bind(this)
    this.handleCommentSave = this.handleCommentSave.bind(this)
  }

  props: Props

  componentWillReceiveProps(nextProps) {
    this.setState({
      leftCommentsCollapsed: this.leftCommentState && nextProps.collapseComments,
      rightCommentsCollapsed: this.rightCommentState && nextProps.collapseComments,
    })
  }

  addLeftComment() {
    this.setState({
      leftCommentState: true,
      rightCommentState: false,
    })
  }

  addRightComment() {
    this.setState({
      leftCommentState: false,
      rightCommentState: true,
      leftCommentsCollapsed: false,
      rightCommentsCollapsed: false,
    })
  }

  mouseOverLeftSide() {
    this.setState({
      hoverLeftSide: true,
    })
  }

  mouseOverRightSide() {
    this.setState({
      hoverRightSide: true,
    })
  }

  mouseOutLeftSide() {
    this.setState({
      hoverLeftSide: false,
    })
  }

  mouseOutRightSide() {
    this.setState({
      hoverRightSide: false,
    })
  }

  cancelComment() {
    this.setState({
      leftCommentState: false,
      rightCommentState: false,
    })
  }

  collapseLeftComments() {
    this.setState({
      leftCommentsCollapsed: !this.state.leftCommentsCollapsed,
    })
  }

  collapseRightComments() {
    this.setState({
      rightCommentsCollapsed: !this.state.rightCommentsCollapsed,
    })
  }

  handleCommentSave(line, text) {
    if (this.props.onComment) {
      this.props.onComment(line, text)
    }
  }

  render() {
    const {
      leftLine,
      rightLine,
      leftCssClass,
      rightCssClass,
      leftOperation,
      rightOperation,
      isBreak,
      leftComments,
      rightComments,
      leftLineNumber,
      rightLineNumber } = this.props
    const codeBreakClass = isBreak ? 'code-break-line' : ''
    const isRightCommented = rightComments.length > 0
    const isLeftCommented = leftComments.length > 0
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
          {!isBreak && !isLeftCommented && !this.state.leftCommentState &&
            <i
              onClick={this.addLeftComment}
              className="fa fa-plus-square code-comment-icon code-comment-icon-left"
              aria-hidden="true"
              style={leftIconStyle}
            />
          }
          {isLeftCommented &&
            <i
              className="fa fa-comment code-comment-thread"
              aria-hidden="true"
              onClick={this.collapseLeftComments}
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
          {isLeftCommented && !this.state.leftCommentsCollapsed &&
            <div className="code-line-comment">
              {leftComments.map(comment => (
                <Comment
                  simpleText
                  key={_.uniqueId('_code_comment')}
                  comment={comment}
                  loggedUsername={this.props.loggedUsername}
                />
              ))}
              {!this.state.leftCommentState &&
                <RaisedButton
                  label="Add Comment"
                  backgroundColor="#d9edf7"
                  style={{ marginRight: '10px' }}
                  onClick={() => this.addLeftComment(leftLine)}
                />
              }
            </div>
          }

          {this.state.leftCommentState &&
            <div className="code-line-comment">
              <Comment
                onComment={text => this.handleCommentSave(leftLineNumber, text)}
                onCancel={this.cancelComment}
              />
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
          {!isBreak && !isRightCommented && !this.state.rightCommentState &&
            <i
              onClick={this.addRightComment}
              className="fa fa-plus-square code-comment-icon code-comment-icon-right"
              aria-hidden="true"
              style={rightIconStyle}
            />
          }
          {isRightCommented &&
            <i
              className="fa fa-comment code-comment-thread"
              aria-hidden="true"
              onClick={this.collapseRightComments}
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
          {isRightCommented && !this.state.rightCommentsCollapsed &&
            <div className="code-line-comment">
              {rightComments.map(comment => (
                <Comment
                  simpleText
                  key={_.uniqueId('_code_comment')}
                  comment={comment}
                  loggedUsername={this.props.loggedUsername}
                />
              ))}
              {!this.state.rightCommentState &&
                <RaisedButton
                  label="Add Comment"
                  backgroundColor="#d9edf7"
                  style={{ marginRight: '10px' }}
                  onClick={() => this.addRightComment(rightLine)}
                />
              }
            </div>
          }

          {this.state.rightCommentState &&
            <div className="code-line-comment">
              <Comment
                onComment={text => this.handleCommentSave(rightLineNumber, text)}
                onCancel={this.cancelComment}
              />
            </div>
          }
        </td>
      </tr>
    )
  }
}

export default SplitRow
