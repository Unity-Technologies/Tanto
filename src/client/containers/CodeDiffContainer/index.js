/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CodeDiffView from 'components/CodeDiffView'
import _ from 'lodash'
import { fetchPullRequestFile, createFileFetchActionType } from 'ducks/pullrequests/actions'
import type { StatusType } from 'ducks/fetch/selectors'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import LoadingComponent from 'components/LoadingComponent'
import { getPullRequestFile } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'
import { getLoggedUsername } from 'ducks/session/selectors'
import type { FileType } from 'universal/types'
import DiffHeader from 'components/DiffHeader'
import Scroll from 'react-scroll'
import Collapse from 'components/Collapse'
const Element = Scroll.Element

type Props = {
  fileName: string,
  file: FileType,
  pullRequestId: string,
  status: StatusType,
  loggedUsername: string,
  dispatch: Function,
  viewType: string
}

export const fetchStatus = (state: Object, props: Object): Function =>
  statusFetchFactory(createFileFetchActionType(props.pullRequestId, props.fileName))

export const getData = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequestFile, fetchStatus, getLoggedUsername,
    (file, status, user) => ({
      file,
      status,
      loggedUsername: user,
    })
  )

class CodeDiffContainer extends PureComponent {

  constructor(props: Props) {
    super(props)
    this.state = {
      viewType: props.viewType || '0',
      startedComment: false,
      collapsed: false,
      commentLine: null,
    }
  }

  props: Props
  state: {
    viewType: string,
    startedComment: boolean,
    collapsed: boolean,
    commentLine: any,
  }

  componentWillMount() {
    const { pullRequestId, fileName } = this.props
    this.props.dispatch(fetchPullRequestFile(pullRequestId, fileName))
  }

  onCollapse = (collapsed: boolean) => {
    // NOTE: slow operation, the whole component will be rerendered
    this.setState({
      collapsed,
    })
  }

  changeDiffViewType = (value) => {
    this.setState({ viewType: value })
  }


  render() {
    if (!this.props.fileName) {
      return null
    }
    const { file, loggedUsername, fileName } = this.props
    const { viewType, collapsed } = this.state
    return (
      <div>
        <Element
          key={_.uniqueId(fileName)}
          name={fileName.replace(/[/.]/g, '')}
          style={{ marginBottom: '20px' }}
        >
          <DiffHeader
            comments={file.comments.length > 0}
            collapsed={collapsed}
            title={file.name}
            stats={file.stats}
            onViewChangeClick={this.changeDiffViewType}
            onCollapse={this.onCollapse}
            selectedValue={this.state.viewType}
          />
          <Collapse isOpened={!collapsed}>
            <LoadingComponent status={this.props.status}>
              <CodeDiffView
                file={file}
                loggedUsername={loggedUsername}
                viewType={viewType}
              />
            </LoadingComponent>
          </Collapse>
        </Element>
      </div>

    )
  }
}

/* flow-disable */
export default connect(getData)(CodeDiffContainer)
