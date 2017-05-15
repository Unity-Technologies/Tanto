/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchLatestBuildsForRevision } from 'ducks/bfstats/actions'
import Builds from './Builds'
import getPRSourceStamp from './selectors'

type BuildType = {
  builder: {
    name: string
  },
  result: number
}

type PropsType = {
  id: string,
  repository: string,
  dispatch: Function,
  revision: string,
  builds: Array<BuildType>,
}

class BuildSection extends PureComponent {
  componentWillReceiveProps(nextprops) {
    if (!nextprops.repository || !nextprops.revision) {
      return
    }
    if (this.props.repository !== nextprops.repository ||
      this.props.revision !== nextprops.revision) {
      this.props.dispatch(

        fetchLatestBuildsForRevision(nextprops.repository, nextprops.revision))
    }
  }

  props: PropsType

  render() {
    return (
      <Builds repository={this.props.repository} revision={this.props.revision} />
    )
  }
}

export default connect(getPRSourceStamp)(BuildSection)
