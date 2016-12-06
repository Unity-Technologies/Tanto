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
  items: Array<any>
};

class AssignedPullRequestList extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchUserAssignedPullRequests())
  }

  props: Props

  render() {
    return (
      <div>
        <Toolbar />
        <PullRequestList {...this.props} />
      </div>
    )
  }
}

export default connect(
  state => ({
    // should come from state
    totalPagesCount: 10,
     // should come from state
    total: 100,
     // should come from state
    totalInProgress: 20,
     // should come from state
    totalNew: 14,
     // should come from state
    activePage: 1,
    isFetching: state.pullrequests.isFetching,
    error: state.pullrequests.error,
    items: sessionSelectors.getPullRequestsAssigned(state) || [],
  })
)(AssignedPullRequestList)
