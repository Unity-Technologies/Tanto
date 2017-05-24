/* @flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import { connect } from 'react-redux'
import { fetchLatestBuildsForRevision } from 'ducks/bfstats/actions'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'
import Builds from './Builds'

type PropsType = {
  repository: string,
  dispatch: Function,
  revision: string,
}

export const getPRSourceStamp = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequest,
    pr => ({
      revision: pr && pr.origin ? pr.origin.revision : null,
      repository: pr && pr.origin ? pr.origin.repository.fullName : null,
    }),
  )

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
