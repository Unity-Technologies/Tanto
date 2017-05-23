// TODO: enable flow

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pureComponent } from 'components/PureComponent'
import PullRequestsPaginated from 'containers/PullRequestsPaginated'
import { fetchPullRequests } from 'ducks/pullrequests/actions'
import { getRepositoryId } from 'ducks/repositories/selectors'

import {
  getPageFetchStatus,
  getPullRequestsPage,
} from 'ducks/pullrequests/selectors'

export type Props = {
  repo: string,
}

const mapStateToProps = (state, props) => ({
  branch: state.session.pullRequests.filters.branch,
  pageSize: 50,
  activePage: state.session.pullRequests.pagination.currentPage,
  total: state.session.pullRequests.pagination.total,
  status: getPageFetchStatus(state),
  items: getPullRequestsPage(state),
  orderBy: state.session.pullRequests.orderBy,
})

function PullRequests(props: Props) {
  return (
    <div>
      <Helmet title="Project Pull Requests" />
      <PullRequestsPaginated
        hideRepoSelect
        mapStateToProps={mapStateToProps}
        fetchData={fetchPullRequests}
        repo={props.repo}
      />
    </div>
  )
}

export const data = createStructuredSelector({
  repo: getRepositoryId,
})

export default connect(data)(pureComponent(PullRequests))

