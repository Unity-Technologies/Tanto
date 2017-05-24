/* @flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import { connect } from 'react-redux'
import { fetchLatestBuildsForRevision } from 'ducks/bfstats/actions'
import Builds from './Builds'
import getPRSourceStamp from './selectors'

type PropsType = {
  repository: string,
  dispatch: Function,
  revision: string,
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
