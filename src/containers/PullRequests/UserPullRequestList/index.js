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
  }
  componentDidMount() {
    this.props.dispatch(actions.fetchUserPullRequests())
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
    pageSize: 10,
    total: state.session.pullRequestsOwned.total,
    activePage: 1,
    isFetching: state.pullrequests.isFetching,
    error: state.pullrequests.error,
    items: sessionSelectors.getPullRequests(state) || [],
  })
)(UserPullRequestList)
