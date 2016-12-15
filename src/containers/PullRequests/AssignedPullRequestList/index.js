/* @flow */

/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'ducks/pullrequests'
import { selectors as sessionSelectors } from 'ducks/session/selectors'
import PullRequestList from 'components/PullRequestList'
import Toolbar from '../Toolbar'

export type Props = {
  dispatch: Function,
  activePage: number,
  pageSize: number,
  total: number,
  items: Array<any>,
}

class AssignedPullRequestList extends Component {
  componentDidMount() {
    const { activePage, pageSize } = this.props
    this.props.dispatch(actions.fetchUserAssignedPullRequests(activePage, pageSize))
  }

  handlePageSelect = (page) => {
    this.props.dispatch(actions.fetchUserAssignedPullRequests(page, this.props.pageSize))
  }

  props: Props

  render() {
    return (
      <div>
        <Toolbar />
        <PullRequestList onPageSelect={this.handlePageSelect} {...this.props} />
      </div>
    )
  }
}

export default connect(
  state => ({
    pageSize: 3,
    activePage: state.session.pullRequestsAssigned.currentPage,
    total: state.session.pullRequestsAssigned.total,
    isFetching: state.pullrequests.isFetching,
    error: state.pullrequests.error,
    items: sessionSelectors.getPullRequestsAssigned(state) || [],
  })
)(AssignedPullRequestList)
