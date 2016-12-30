/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { FetchPullRequestArgs } from 'ducks/pullrequests'
import { FiltersFields } from 'ducks/pullrequests'
import LinearProgress from 'material-ui/LinearProgress'
import ErrorMessage from 'components/ErrorMessage'
import PullRequestList from 'components/PullRequestList'
import BranchSelect from 'containers/BranchSelect'
import RepoSelect from 'containers/RepoSelect'
import OrderSelect from 'containers/OrderSelect'
import type { OrderByType, DirectionType } from 'ducks/order'

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
  showRepoSelect: boolean,
}

const selectBoxStyle = { minWidth: '200px', maxWidth: '250px', marginRight: '5px' }

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

  handleOrderChange = (order: DirectionType): void => {
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
        <div
          style={{
            padding: '5px',
            display: 'flex',
            marginBottom: '5px',
            borderRadius: '4px',
            backgroundColor: 'rgb(242, 242, 242)',
          }}
        >
          {!this.props.showRepoSelect &&
            <div style={selectBoxStyle}>
              <RepoSelect
                onSelect={this.handleRepoSelect}
              />
            </div>
          }
          <div style={selectBoxStyle}>
            <BranchSelect
              repoId={this.props.repo}
              onSelect={this.handleBranchSelect}
            />
          </div>
          <div style={selectBoxStyle}>
            <OrderSelect
              options={FiltersFields}
              onSelect={this.handleOrderFieldSelect}
              onOrderChange={this.handleOrderChange}
            />
          </div>
        </div>
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

