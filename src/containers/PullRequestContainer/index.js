/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { FetchPullRequestArgs } from 'ducks/pullrequests'
import { FiltersFields } from 'ducks/pullrequests'
import LinearProgress from 'material-ui/LinearProgress'
import ErrorMessage from 'components/ErrorMessage'
import PullRequestList from 'components/PullRequestList'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import BranchSelect from 'containers/BranchSelect'
import RepoSelect from 'containers/RepoSelect'
import OrderSelect from 'containers/OrderSelect'
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
  orderBy: OrderByType,
  fetchData: Function,
}

class PullRequestContainer extends Component {
  componentDidMount() {
    const args = this.getArguments()
    this.props.dispatch(this.props.fetchData(args))
  }

  props: Props

  getArguments = (): FetchPullRequestArgs => ({
    pageSize: this.props.pageSize,
    page: this.props.activePage,
    orderBy: this.props.orderBy,
    branch: this.props.branch,
    repo: this.props.repo,
  })

  handlePageSelect = (page) => {
    const args = this.getArguments()
    args.page = page
    this.props.dispatch(this.props.fetchData(args))
  }

  handleOrderChange = (order: string): void => {
    const args = this.getArguments()
    args.orderBy.direction = order
    this.props.dispatch(this.props.fetchData(args))
  }

  handleRepoSelect = (repo: string): void => {
    const args = this.getArguments()
    args.repo = repo
    this.props.dispatch(this.props.fetchData(args))
  }

  handleBranchSelect = (branch: string): void => {
    const args = this.getArguments()
    args.branch = branch
    this.props.dispatch(this.props.fetchData(args))
  }

  handleOrderFieldSelect = (field: string): void => {
    const args = this.getArguments()
    args.orderBy.field = field
    this.props.dispatch(this.props.fetchData(args))
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
              options={FiltersFields}
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

export default connect((state, props) => props.mapStateToProps(state, props))(PullRequestContainer)

