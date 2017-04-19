/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import CodeDiffView from 'components/CodeDiffView'
import _ from 'lodash'
import { createSelector } from 'reselect'
import { getLoggedUsername } from 'ducks/session/selectors'
import { processDiff } from 'ducks/diff'
import DiffHeader from 'components/DiffHeader'
import Scroll from 'react-scroll'
import Collapse from 'components/Collapse'


const Element = Scroll.Element

type Props = {
  id: string,
  file: Object,
  pullRequestId: string,
  loggedUsername: string,
  dispatch: Function,
  viewType: string,
  unifiedDiff: any,
}

export const getFile = (state: Object, props: Object) => {
  console.log(`getFile: ${props.id}`)
  const file = state.entities.files[props.id] || null
  console.log(file && file.diff ? 'File diff is here' : 'No diff yet')
  return file
}

export const getSideBySideFileDiff = (state: Object, props: Object) => {
  console.log(`getSideBySideFileDiff: ${props.id}`)
  const file = state.ui.diff[props.id] || null
  return file ? file[1] : null
}

export const getUnifiedFileDiff = (state: Object, props: Object) => {
  console.log(`getUnifiedFileDiff: ${props.id}`)
  const file = state.ui.diff[props.id] || null
  return file ? file[0] : null
}

export const getData =
  createSelector(
    getFile,
    getLoggedUsername,
    getUnifiedFileDiff,
    (file, user, unifiedDiff) => ({
      file,
      unifiedDiff,
      loggedUsername: user,
    })
  )

class CodeDiffContainer extends Component {

  constructor(props: Props) {
    super(props)
    this.state = {
      viewType: props.viewType || '0',
      startedComment: false,
      collapsed: false,
      commentLine: null,
    }

    const { id, diff, type } = this.props.file
    if (diff) {
      this.props.dispatch(processDiff(id, type, diff, 0))
    }
  }

  componentWillMount() {
    // if (!this.props.file) {
    //   return
    // }
    // const { id, diff, type, unifiedDiff } = this.props.file
    // if (!diff || (unifiedDiff && unifiedDiff.length)) {
    //   return
    // }

    // this.props.dispatch(processDiff(id, type, diff, 0))
  }


  componentWillReceiveProps(nextprops) {
    const { diff, id, type } = this.props.file
    if (diff !== nextprops.file.diff) {
      this.props.dispatch(processDiff(id, type, diff, 0))
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.file.diff || nextProps.unifiedDiff
  }

  props: Props
  state: {
    viewType: string,
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
  }


  render() {
    console.log('RENDERED')

    const {
      loggedUsername,
      file: { type, comments, stats, diff, name },
      unifiedDiff,
    } = this.props

    if (!diff) {
      console.log('null return')
      return null
    }

    const { viewType, collapsed } = this.state
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
          {!diff || !unifiedDiff && <div> Loading...</div>}
          {unifiedDiff &&
            <Collapse isOpened={!collapsed}>
              <CodeDiffView
                type={type}
                rawDiff={diff}
                unifiedDiff={unifiedDiff}
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
