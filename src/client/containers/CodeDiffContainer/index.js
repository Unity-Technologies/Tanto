/* @flow */
/* eslint-disable no-console */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CodeDiffView from 'components/CodeDiffView'
import _ from 'lodash'
import { createSelector } from 'reselect'
import { getLoggedUsername } from 'ducks/session/selectors'
import { processDiff } from 'ducks/diff'
import DiffHeader from 'components/DiffHeader'
import Scroll from 'react-scroll'
import Collapse from 'components/Collapse'
import LinearProgress from 'material-ui/LinearProgress'
import { DiffTypes } from 'universal/constants'
const Element = Scroll.Element

type Props = {
  id: string,
  file: Object,
  pullRequestId: string,
  loggedUsername: string,
  dispatch: Function,
  viewType: number,
  unifiedDiff: any,
  sideBySideDiff: any,
}

export const getFile = (state: Object, props: Object) => {
  const file = state.entities.files[props.id] || null
  console.log(file && file.diff ? `File diff is here: ${file.diff.length}` : 'No diff yet')
  return file
}

export const getSideBySideFileDiff = (state: Object, props: Object) => {
  const file = state.ui.diff[props.id] || null
  console.log(file && file[1] ? 'SidebySide diff is here' : 'No SidebySide diff yet')
  return file ? file[1] : null
}

export const getUnifiedFileDiff = (state: Object, props: Object) => {
  const file = state.ui.diff[props.id] || null
  console.log(file && file[0] ? 'Unified diff is here' : 'No unified diff yet')
  return file ? file[0] : null
}

export const getData =
  createSelector(
    getFile,
    getLoggedUsername,
    getUnifiedFileDiff,
    getSideBySideFileDiff,
    (file, user, unifiedDiff, sideBySideDiff) => {
      console.log('get data CALLED')
      return {
        file,
        unifiedDiff,
        sideBySideDiff,
        loggedUsername: user,
      }
    }
  )

class CodeDiffContainer extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = {
      viewType: props.viewType || 0,
      startedComment: false,
      collapsed: false,
      commentLine: null,
    }
  }

  componentWillMount() {
    console.log('componentWillMount')
    const { id, diff, type } = this.props.file
    if (diff) {
      console.log('componentWillMount dispatched process')
      this.props.dispatch(processDiff(id, type, diff, this.state.viewType))
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log('componentWillReceiveProps')
    const { diff, id, type } = this.props.file
    if (diff !== nextProps.file.diff && nextProps.file.diff) {
      console.log('componentWillReceiveProps dispatched process')
      this.props.dispatch(processDiff(id, type, nextProps.file.diff, 0))
    }
  }

  props: Props
  state: {
    viewType: number,
    startedComment: boolean,
    collapsed: boolean,
    commentLine: any,
  }

  onCollapse = (collapsed: boolean) => {
    // NOTE: slow operation, the whole component will be rerendered
    this.setState({
      collapsed,
    })
  }

  changeDiffViewType = (value) => {
    this.setState({ viewType: value })

    if ((value === DiffTypes.UNIFIED && !this.props.unifiedDiff) ||
      (value === DiffTypes.SIDE_BY_SIDE && !this.props.sideBySideDiff)) {
      const { diff, id, type } = this.props.file
      this.props.dispatch(processDiff(id, type, diff, value))
    }
  }

  render() {
    console.log('RENDERED container')
    const {
      loggedUsername,
      file: { type, comments, stats, diff, name },
      unifiedDiff,
      sideBySideDiff,
    } = this.props

    const { viewType, collapsed } = this.state
    const anyDiff = unifiedDiff || sideBySideDiff
    return (
      <div>
        <Element
          key={_.uniqueId(name)}
          name={name.replace(/[/.]/g, '')}
          style={{ marginBottom: '20px' }}
        >
          <DiffHeader
            comments={comments ? comments.length > 0 : false}
            collapsed={collapsed}
            title={name}
            stats={stats}
            onViewChangeClick={this.changeDiffViewType}
            onCollapse={this.onCollapse}
            selectedValue={this.state.viewType}
          />
          {!anyDiff && <LinearProgress />}
          {anyDiff &&
            <Collapse isOpened={!collapsed}>
              <CodeDiffView
                type={type}
                rawDiff={diff}
                unifiedDiff={unifiedDiff}
                sideBySideDiff={sideBySideDiff}
                loggedUsername={loggedUsername}
                viewType={viewType}
              />
            </Collapse>
          }
        </Element>
      </div>

    )
  }
}

/* flow-disable */
export default connect(getData)(CodeDiffContainer)
