/* @flow */


import React, { Component } from 'react'
import { connect } from 'react-redux'
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
  hideRepoSelect: boolean,
}

const selectBoxStyle = { minWidth: '200px', maxWidth: '250px', marginRight: '5px' }

class PullRequestsPaginated extends Component {
  componentDidMount() {
    const args = this.getArguments()
    this.props.dispatch(this.props.fetchData(args))
  }

  getArguments = (): Object => ({
    pageSize: this.props.pageSize,
    first: this.props.pageSize,
    offset: this.props.pageSize * (this.props.activePage - 1),
    page: this.props.activePage,
    orderBy: this.props.orderBy,
    branch: this.props.branch,
    repo: this.props.repo,
  })

  props: Props

  handlePageSelect = (page) => {
    const args = this.getArguments()
    args.page = page
    args.offset = args.pageSize * (page - 1)
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

  // FIXME: add handler here when API is ready
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
          {!this.props.hideRepoSelect &&
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

export default connect((state, props) => props.mapStateToProps(state, props))(PullRequestsPaginated)

