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

class UserPullRequestList extends Component {
  constructor(props: Props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  componentDidMount() {
    const { activePage, pageSize } = this.props
    this.props.dispatch(actions.fetchUserPullRequests(activePage, pageSize))
  }

  handlePageSelect = (page) => {
    this.props.dispatch(actions.fetchUserPullRequests(page, this.props.pageSize))
  }

  props: Props

  handleRemove = (id) => {

  }

  render() {
    return (
      <div>
        <Toolbar />
        <PullRequestList showRemoveButton onPageSelect={this.handlePageSelect} onRemoveClick={this.handleRemove} {...this.props} />
      </div>
    )
  }
}

export default connect(
  state => ({
    pageSize: 3,
    activePage: state.session.pullRequestsOwned.currentPage,
    total: state.session.pullRequestsOwned.total,
    isFetching: state.pullrequests.isFetching,
    error: state.pullrequests.error,
    items: sessionSelectors.getPullRequests(state) || [],
  })
)(UserPullRequestList)
