/* @flow */

/* eslint-disable */

import React, { PropTypes, Component } from 'react'
import Prism from 'prismjs'
import { ErrorMessage } from 'components'
import _ from 'lodash'
import LinearProgress from 'material-ui/LinearProgress'
import 'prismjs/themes/prism.css'
import UnifiedRow from '../UnifiedRow/UnifiedRow'
import SplitRow from '../SplitRow/SplitRow'
import {
  getUnifiedDiff,
  getSideBySideDiff,
} from '../PrismCodeParser/PrismCodeParser'


export type Props = {
  type: string,
  diff: string,
  comments?: Array<any>,
  collapseComments?: boolean,
  viewType?: string,
};


class Code extends Component {
  asyncProcessCode({ type, viewType, diff }) {
    const promise = new Promise((resolve) => {
      const html = Prism.highlight(diff, Prism.languages[type] || Prism.languages.clike)
      let lines = null
      if (viewType === '0') {
        lines = getUnifiedDiff(html)
        resolve(lines)
        return
      } else if (viewType === '1') {
        lines = getSideBySideDiff(html)
        resolve(lines)
        return
      }
      resolve(diff)
      return
    })

    return promise
  }

  getFileComments(fileComments, lineNumber, version) {
    const lineComments = version ?
      _.find(fileComments, { line: lineNumber, version }) :
      _.find(fileComments, { line: lineNumber })
    if (lineComments) {
      return lineComments.comments
    }

    return []
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      ready: false,
      content: null,
      error: null,
    }


    this.changeDiffViewType = this.changeDiffViewType.bind(this)
    this.processCode = this.processCode.bind(this)
    this.getFileComments = this.getFileComments.bind(this)
    this.updateCode = this.updateCode.bind(this)
  }

  props: Props;

  componentWillMount() {
    this.asyncProcessCode(this.props).then(this.updateCode)
  }

  updateCode(code) {
    this.setState({
      content: code,
      ready: true,
    })
  }

  changeDiffViewType(value) {
    this.setState({ viewType: value })
  }

  processCode() {
    const { content } = this.state
    const { collapseComments, comments, viewType } = this.props
    if (viewType === '0') {
      return (
        <table className="code-block diff-unified">
          <tbody>
            {content.map(line => (
              <UnifiedRow
                key={_.uniqueId('_split_code_row')}
                collapseComments={collapseComments}
                comments={
                  this.getFileComments(comments, line.newLineNumber || line.oldLineNumber)}
                {...line}
              />))}
          </tbody>
        </table>
      )
    } else if (viewType === '1') {
      return (
        <table className="code-block diff-split">
          <tbody>{content.map(line => (
            <SplitRow
              key={_.uniqueId('_split_code_row')}
              collapseComments={collapseComments}
              leftComments={
                this.getFileComments(comments, line.leftLineNumber, 'old')}
              rightComments={
                this.getFileComments(comments, line.rightLineNumber, 'new')}
              {...line}
            />
            ))}</tbody>
        </table>
      )
    }

    return (
      <div className="diff-raw">
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }

  render() {
    return (
      <div>
        {!this.state.ready &&
        <LinearProgress mode="indeterminate" />
      }
        {this.state.ready &&
        <pre
          key={_.uniqueId('_code_')}
          className="diff-view"
        >
          <code className={`language-${this.props.type}`} ref={(c) => { this.code = c }}>
            {this.processCode()}
          </code>
        </pre>
      }
        {!!this.state.error &&
        <ErrorMessage message={this.state.error} />
      }
      </div>
    )
  }
}

export default Code
