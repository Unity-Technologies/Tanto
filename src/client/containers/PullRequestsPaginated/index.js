/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress'
import ErrorMessage from 'components/ErrorMessage'
import PullRequestList from 'components/PullRequestList'
import BranchSelect from 'containers/BranchSelect'
import RepoSelect from 'containers/RepoSelect'
import OrderSelect from 'containers/OrderSelect'
import Alert from 'react-bootstrap/lib/Alert'
import type { StatusType } from 'ducks/pullrequests/selectors'
import PureComponent from 'components/PureComponent'
import type { OrderByType, DirectionType } from 'ducks/order'
import { PullRequestOrderFields } from 'universal/constants'

export type Props = {
  dispatch: Function,
  activePage: number,
  pageSize: number,
  status: StatusType,
  items: Array<any>,
  branch: string,
  repo: string,
  orderBy: OrderByType,
  fetchData: Function,
  hideRepoSelect: boolean,
}

const selectBoxStyle = { minWidth: '200px', maxWidth: '250px', marginRight: '5px' }

class PullRequestsPaginated extends PureComponent {
  componentWillMount() {
    const args = this.getArguments()
    this.props.dispatch(this.props.fetchData(args))
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.repo !== nextProps.repo) {
      const args = {
        ...this.getArguments(), repo: nextProps.repo,
      }
      this.props.dispatch(this.props.fetchData(args))
    }
  }

  getArguments = (): Object => ({
    pageSize: this.props.pageSize,
    limit: this.props.pageSize,
    offset: this.props.activePage > 0 ? this.props.pageSize * (this.props.activePage - 1) : 0,
    page: this.props.activePage,
    orderBy: this.props.orderBy,
    branch: this.props.branch,
    repo: this.props.repo,
  })

  props: Props

  handlePageSelect = (page) => {
    const args = this.getArguments()
    args.page = page
    args.offset = page > 1 ? args.pageSize * (page - 1) : 0
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
    if (!this.props.items) {
      return null
    }

    const { status: { error, isFetching } } = this.props
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
              repoName={this.props.repo}
              onSelect={this.handleBranchSelect}
            />
          </div>
          <div style={selectBoxStyle}>
            <OrderSelect
              options={Object.keys(PullRequestOrderFields)}
              defaultOption={PullRequestOrderFields.UPDATED}
              onSelect={this.handleOrderFieldSelect}
              onOrderChange={this.handleOrderChange}
            />
          </div>
        </div>
        {isFetching && <LinearProgress />}
        {error && <ErrorMessage error={error} />}
        {!isFetching && !error && !this.props.items.length &&
          <Alert bsStyle="warning" style={{ fontSize: '13px' }}>
            <strong>
              <i className="fa fa-exclamation-circle" /> </strong>
            There is no pull request
          </Alert>
        }
        <PullRequestList
          onPageSelect={this.handlePageSelect}
          onRemoveClick={this.handleRemove}
          {...this.props}
        />

      </div>
    )
  }
}

export default connect((state, props) => props.mapStateToProps(state, props))(PullRequestsPaginated)

