/* eslint-disable import/no-extraneous-dependencies */

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'ducks/pullrequests'
import { selectors as sessionSelectors } from 'ducks/session/selectors'
import PullRequestList from 'components/PullRequestList'
import Toolbar from '../Toolbar'

class AssignedPullRequestList extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchUserAssignedPullRequests())
  }

  render() {
    return (
      <div>
        <Toolbar />
        <PullRequestList {...this.props} />
      </div>
    )
  }
}

AssignedPullRequestList.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
    activePage: 0,
    isFetching: state.pullrequests.isFetching,
    error: state.pullrequests.error,
    items: sessionSelectors.getComputedPullRequestsAssigned(state) || [],
  })
)(AssignedPullRequestList)

