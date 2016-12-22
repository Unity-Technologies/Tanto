/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserPullRequests } from 'ducks/pullrequests'
import LinearProgress from 'material-ui/LinearProgress'
import ErrorMessage from 'components/ErrorMessage'
import { pullRequestsOwned } from 'ducks/session/selectors'
import { isOwnedFetching, ownedError } from 'ducks/pullrequests/selectors'
import PullRequestList from 'components/PullRequestList'
import Toolbar from '../Toolbar'

export type Props = {
  dispatch: Function,
  activePage: number,
  pageSize: number,
  isFetching: boolean,
  total: number,
  error: Object,
  items: Array<any>,
}

class UserPullRequestList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserPullRequests(this.props.activePage, this.props.pageSize))
  }

  handlePageSelect = (page) => {
    this.props.dispatch(fetchUserPullRequests(page, this.props.pageSize))
  }

  props: Props

  handleRemove = (id) => {

  }

  render() {
    return (
      <div>
        <Toolbar />
        {this.props.isFetching && <LinearProgress />}
        {this.props.error && <ErrorMessage error={this.props.error} />}
        <PullRequestList
          showRemoveButton
          onPageSelect={this.handlePageSelect}
          onRemoveClick={this.handleRemove} {...this.props}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    pageSize: 3,
    activePage: state.session.pullRequestsOwned.currentPage,
    total: state.session.pullRequestsOwned.total,
    isFetching: isOwnedFetching(state),
    error: ownedError(state),
    items: pullRequestsOwned(state) || [],
  })
)(UserPullRequestList)
