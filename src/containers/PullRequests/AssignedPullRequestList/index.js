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
  items: Array<any>,
  pageSize: number,
}

class AssignedPullRequestList extends Component {
  constructor(props: Props) {
    super(props)
    this.handlePageSelect = this.handlePageSelect.bind(this)
    this.state = { activePage: 1 }
  }

  componentDidMount() {
    const first = this.props.pageSize
    const offset = 0
    this.props.dispatch(actions.fetchUserAssignedPullRequests(first, offset))
  }

  handlePageSelect = (offset) => {

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
    pageSize: 10,
    total: state.session.pullRequestsAssigned.total,
    activePage: 1,
    isFetching: state.pullrequests.isFetching,
    error: state.pullrequests.error,
    items: sessionSelectors.getPullRequestsAssigned(state) || [],
  })
)(AssignedPullRequestList)
