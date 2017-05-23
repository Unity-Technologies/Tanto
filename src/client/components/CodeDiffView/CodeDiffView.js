/* flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import _ from 'lodash'
import 'prismjs/themes/prism.css'
import UnifiedRow from './UnifiedRow/UnifiedRow'
import SplitRow from './SplitRow/SplitRow'
import './CodeDiffView.css'


export type Props = {
  type: string,
  rawDiff: string,
  unifiedDiff: Array<any>,
  sideBySideDiff: Array<any>,
  viewType?: string,
  loggedUser: Object,
  comments: Object,
  onCreateInlineComment: (lineNumber: string, text: string, issue: any) => void,
  onUpdateInlineComment: (commentId: string, text: string) => void,
  onDeleteInlineComment: (commentId: string, text: string) => void,
}

const defaultEmptyList = []

class CodeDiffView extends PureComponent {
  static defaultProps = {
    viewType: '0',
  }

  props: Props

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return (this.props.rawDiff || this.props.unifiedDiff || this.props.sideBySideDiff) &&
      super.shouldComponentUpdate(nextProps, nextState)
  }

  selectUnifiedComments = (oldLine: number, newLine: number) => {
    if (!this.props.comments) {
      return []
    }
    if (oldLine && !newLine) {
      return this.props.comments[`o${oldLine}`] || defaultEmptyList
    }
    if (newLine && !oldLine) {
      return this.props.comments[`n${newLine}`] || defaultEmptyList
    }

    return oldLine === newLine ?
      this.props.comments[`n${oldLine}`] || this.props.comments[`o${oldLine}`] : defaultEmptyList
  }

  renderDiff = () => {
    const { viewType, loggedUser } = this.props

    if (viewType === 0) {
      const content = this.props.unifiedDiff
      return (
        <table className="code-block diff-unified">
          <tbody>
            {content.map(line => (
              <UnifiedRow
                key={_.uniqueId('_split_code_row')}
                loggedUser={loggedUser}
                comments={this.selectUnifiedComments(line.oldLineNumber, line.newLineNumber)}
                onCreateInlineComment={this.props.onCreateInlineComment}
                onUpdateInlineComment={this.props.onUpdateInlineComment}
                onDeleteInlineComment={this.props.onDeleteInlineComment}
                {...line}
              />))}
          </tbody>
        </table>
      )
    } else if (viewType === 1) {
      const content = this.props.sideBySideDiff
      return (
        <table className="code-block diff-split">
          <tbody>{content.map(line => (
            <SplitRow
              key={_.uniqueId('_split_code_row')}
              loggedUser={loggedUser}
              leftComments={this.props.comments[`o${line.leftLineNumber}`]}
              rightComments={this.props.comments[`n${line.rightLineNumber}`]}
              onCreateInlineComment={this.props.onCreateInlineComment}
              onUpdateInlineComment={this.props.onUpdateInlineComment}
              onDeleteInlineComment={this.props.onDeleteInlineComment}
              {...line}
            />
          ))}</tbody>
        </table>
      )
    }

    return (
      <div className="diff-raw">
        <span>{this.props.rawDiff} </span>
      </div>
    )
  }

  render() {
    return (
      <pre
        key={_.uniqueId('_code_')}
        className="diff-view"
      >
        <code className={`language-${this.props.type}`}>
          {this.renderDiff()}
        </code>
      </pre>

    )
  }
}

export default CodeDiffView
