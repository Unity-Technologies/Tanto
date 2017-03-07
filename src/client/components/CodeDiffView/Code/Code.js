// TODO: finish flow annotations

import React, { PureComponent } from 'react'
import Prism from 'prismjs'
import ErrorMessage from 'components/ErrorMessage'
import _ from 'lodash'
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
  loggedUsername: string,
};


class Code extends PureComponent {
  /* eslint-disable react/sort-comp */
  asyncProcessCode = ({ type, viewType, diff }) => {
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

  getFileComments = (fileComments, lineNumber, version) => {
    if (!lineNumber) {
      return []
    }
    const prfx = version || ''

    const res = _.filter(fileComments, (x) => x.lineNumber.match(`${prfx}${lineNumber}`))

    return res
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      ready: false,
      content: null,
      error: null,
    }
  }

  props: Props

  componentDidMount() {
    this.asyncProcessCode(this.props).then(this.updateCode)
  }

  updateCode = (code) => {
    this.setState((prevState, props) => ({
      content: code,
      ready: true,
    }))
  }

  renderDiff = () => {
    const { content } = this.state
    const { collapseComments, comments, viewType, loggedUsername } = this.props
    if (viewType === '0') {
      return (
        <table className="code-block diff-unified">
          <tbody>
            {content.map(line => (
              <UnifiedRow
                key={_.uniqueId('_split_code_row')}
                collapseComments={collapseComments}
                loggedUsername={loggedUsername}
                comments={
                  this.getFileComments(comments,
                    line.newLineNumber || line.oldLineNumber, line.newLineNumber ? 'n' : 'o')}
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
              loggedUsername={loggedUsername}
              leftComments={
                this.getFileComments(comments, line.leftLineNumber, 'o')}
              rightComments={
                this.getFileComments(comments, line.rightLineNumber, 'n')}
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
    if (!this.state.ready) {
      return <div>processing diff...</div>
    }

    if (!!this.state.error) {
      return <ErrorMessage text={this.state.error} />
    }
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

export default Code
