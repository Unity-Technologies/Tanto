/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchLatestBuildsForRevision } from 'ducks/bfstats/actions'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'
import Builds from './Builds'

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

export const getPRSourceStamp = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequest,
    (pr) => ({
      revision: pr && pr.origin ? pr.origin.revision : null,
      repository: pr && pr.origin ? pr.origin.repository.fullName : null,
    })
  )

class BuildSection extends PureComponent {
  componentWillReceiveProps(nextprops) {
    if (!nextprops.repository || !nextprops.revision) {
      return
    }
    if (this.props.repository !== nextprops.repository ||
      this.props.revision !== nextprops.revision) {
      this.props.dispatch(

        fetchLatestBuildsForRevision(nextprops.repository, '29a7efaab3ad6a82214c203f6c21553eb1571f5f'))
    }
  }

  props: PropsType

  render() {
    return (
      <Builds repository={this.props.repository} revision={'29a7efaab3ad6a82214c203f6c21553eb1571f5f'} />
    )
  }
}

export default connect(getPRSourceStamp)(BuildSection)
