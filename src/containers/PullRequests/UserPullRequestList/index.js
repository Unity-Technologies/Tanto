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
}

class UserPullRequestList extends Component {
  constructor(props: Props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.state = { activePage: 1, pageSize: 10 }
  }

  componentDidMount() {
    const first = this.state.pageSize
    const offset = 0
    this.props.dispatch(actions.fetchUserPullRequests(first, offset))
  }

  props: Props

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

export default connect(
  state => ({
    total: state.session.pullRequestsOwned.total,
    isFetching: state.pullrequests.isFetching,
    error: state.pullrequests.error,
    items: sessionSelectors.getPullRequests(state) || [],
  })
)(UserPullRequestList)
