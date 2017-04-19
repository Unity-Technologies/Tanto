// TODO: finish flow annotations

import React, { PureComponent } from 'react'
// import Prism from 'prismjs'
// import ErrorMessage from 'components/ErrorMessage'
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
  // collapseComments?: boolean,
  viewType?: string,
  loggedUsername: string,
}

class CodeDiffView extends PureComponent {
  props: Props

  renderDiff = () => {
    const { viewType, loggedUsername } = this.props

    if (viewType === '0') {
      const content = this.props.unifiedDiff
      return (
        <table className="code-block diff-unified">
          <tbody>
            {content.map(line => (
              <UnifiedRow
                key={_.uniqueId('_split_code_row')}
                collapseComments={false}
                loggedUsername={loggedUsername}
                comments={[]}
                {...line}
              />))}
          </tbody>
        </table>
      )
    } else if (viewType === '1') {
      const content = this.props.unifiedDiff
      return (
        <table className="code-block diff-split">
          <tbody>{content.map(line => (
            <SplitRow
              key={_.uniqueId('_split_code_row')}
              collapseComments={false}
              loggedUsername={loggedUsername}
              leftComments={[]}
              rightComments={[]}
              {...line}
            />
          ))}</tbody>
        </table>
      )
    }
    const content = this.props.rawDiff
    return (
      <div className="diff-raw">
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }


  render() {
    if (!this.props.rawDiff && !this.props.unifiedDiff && !this.props.sideBySideDiff) {
      return null
    }
    return (
      <pre
        ref="contentContainer"
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
