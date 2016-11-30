/* eslint-disable import/no-extraneous-dependencies */

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'ducks/pullrequests'
import { selectors as sessionSelectors } from 'ducks/session/selectors'
import PullRequestList from 'components/PullRequestList'
import Toolbar from '../Toolbar'

class UserPullRequestList extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(actions.fetchUserPullRequests())
  }

  handleRemove = (id) => {

  }

  render() {
    return (
      <div>
        <Toolbar />
        <PullRequestList showRemoveButton onRemoveClick={this.handleRemove} {...this.props} />
      </div>
    )
  }
}

UserPullRequestList.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    // should come from state
    totalPagesCount: 10,
     // should come from state
    total: 5,
     // should come from state
    totalInProgress: 20,
     // should come from state
    totalNew: 14,
     // should come from state
    activePage: 1,
    isFetching: state.pullrequests.isFetching,
    error: state.pullrequests.error,
    items: sessionSelectors.getComputedPullRequests(state) || [],
  })
)(UserPullRequestList)

