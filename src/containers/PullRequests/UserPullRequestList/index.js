/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserPullRequests, fetchUserPullRequests2 } from 'ducks/pullrequests'
import type { FetchPullRequestArgs } from 'ducks/pullrequests'
import LinearProgress from 'material-ui/LinearProgress'
import ErrorMessage from 'components/ErrorMessage'
import { pullRequestsOwned } from 'ducks/session/selectors'
import { isOwnedFetching, ownedError } from 'ducks/pullrequests/selectors'
import PullRequestList from 'components/PullRequestList'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import BranchSelect from '../BranchSelect'
import RepoSelect from '../RepoSelect'
import OrderSelect from '../OrderSelect'
import type { OrderByType } from 'ducks/order'

export type Props = {
  dispatch: Function,
  activePage: number,
  pageSize: number,
  isFetching: boolean,
  total: number,
  error: Object,
  items: Array<any>,
  branch: string,
  repo: string,
  orderBy: OrderByType
}

const UPDATED = 'UPDATED'

class UserPullRequestList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserPullRequests(this.props.activePage, this.props.pageSize))
  }

  handlePageSelect = (page) => {
    this.props.dispatch(fetchUserPullRequests(page, this.props.pageSize))
  }

  props: Props

  getArguments = (): FetchPullRequestArgs => ({
    pageSize: this.props.pageSize,
    page: this.props.activePage,
    orderBy: this.props.orderBy,
    branch: this.props.branch,
    repo: this.props.repo,
  })

  handleOrderChange = (order: string): void => {
    const args = this.getArguments()
    args.orderBy.direction = order
    this.props.dispatch(fetchUserPullRequests2(args))
  }

  handleRepoSelect = (repo: string): void => {
    const args = this.getArguments()
    args.repo = repo
    this.props.dispatch(fetchUserPullRequests2(args))
  }

  handleBranchSelect = (branch: string): void => {
    const args = this.getArguments()
    args.branch = branch
    this.props.dispatch(fetchUserPullRequests2(args))
  }

  handleOrderFieldSelect = (field: string): void => {
    const args = this.getArguments()
    args.orderBy.field = field
    this.props.dispatch(fetchUserPullRequests2(args))
  }

  handleRemove = (id) => {

  }

  render() {
    return (
      <div>
        <Row>
          <Col md={3}>
            <RepoSelect onSelect={this.handleRepoSelect} />
          </Col>

          <Col md={3}>
            <BranchSelect
              repoId={this.props.repo}
              onSelect={this.handleBranchSelect}
            />
          </Col>

          <Col md={4}>
            <OrderSelect
              options={[UPDATED]}
              onSelect={this.handleOrderFieldSelect}
              onOrderChange={this.handleOrderChange}
            />
          </Col>
        </Row>
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
    repo: state.session.pullRequestsOwned.filters.repo,
    branch: state.session.pullRequestsOwned.filters.branch,
    pageSize: 3,
    activePage: state.session.pullRequestsOwned.pagination.currentPage,
    total: state.session.pullRequestsOwned.pagination.total,
    isFetching: isOwnedFetching(state),
    error: ownedError(state),
    items: pullRequestsOwned(state) || [],
    orderBy: state.session.pullRequestsOwned.orderBy,
  })
)(UserPullRequestList)
