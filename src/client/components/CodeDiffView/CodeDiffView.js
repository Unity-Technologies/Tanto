// TODO: finish flow annotations

import React, { PureComponent } from 'react'
import type { FileType } from 'universal/types'
import 'react-select/dist/react-select.css'

import Code from './Code/Code'
import './CodeDiffView.css'


export type Props = {
  file: FileType,
  viewType: string,
  collapsedComments: boolean,
  loggedUsername: string,
  viewType?: number,
}

class CodeDiffView extends PureComponent {
  /* eslint-disable react/sort-comp */
  static renderValue(option) {
    return <span>{option.value}</span>
  }

  props: Props

  render() {
    const { file } = this.props
    if (!file || !file.diff) {
      return null
    }
    return (
      <div>
        <Code
          viewType={this.props.viewType}
          loggedUsername={this.props.loggedUsername}
          collapseComments={this.props.collapsedComments}
          {...file}
        />
      </div>
    )
  }
}

export default CodeDiffView
