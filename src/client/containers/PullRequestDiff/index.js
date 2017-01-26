/* @flow */

import React, { Component } from 'react'
import type { FileType } from 'universal/types'
import { connect } from 'react-redux'
import CodeDiffView from 'components/CodeDiffView'
import { fetchPullRequestData } from 'ducks/pullrequests/actions'
import pullRequestFiles from './pullRequestFiles.graphql'
import type { StatusType } from 'ducks/fetch'
import { statusFetchCreator } from 'ducks/fetch'
import LoadingComponent from 'components/LoadingComponent'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

type Props = {
  files: Array<FileType>,
  status: StatusType,
}

const action = 'component/PULL_REQUEST_DIFF'

export const fetchStatus = statusFetchCreator(action)
export const getLoggedUser = (state: Object) => state.session.profile.username
export const getData = (state: Object, props: Object): string =>
  createSelector(
    getPullRequest, fetchStatus, getLoggedUser,
    (pr, status, user) => ({
      files: pr ? pr.files : [],
      status,
      loggedUsername: user,
    })
  )


class PullRequestDiff extends Component {
  componentDidMount() {
    this.props.dispatch(
      fetchPullRequestData(action, pullRequestFiles, { id: this.props.pullRequestId }))
  }
  props: Props

  render() {
    return (
      <LoadingComponent status={this.props.status}>
        <CodeDiffView files={this.props.files} loggedUsername={this.props.loggedUsername} />
      </LoadingComponent>
    )
  }
}

export default connect(getData)(PullRequestDiff)
