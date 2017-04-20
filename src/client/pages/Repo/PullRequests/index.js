// TODO: enable flow

import React from 'react'
import PullRequestsPaginated from 'containers/PullRequestsPaginated'
import { fetchPullRequests } from 'ducks/pullrequests/actions'

import {
  getPageFetchStatus,
  getPullRequestsPage,
} from 'ducks/pullrequests/selectors'

export type Props = {
  project_pullrequests: Array<any>,
  params: {
    id: string,
  },
  repo: string,
  items: Array<any>,
}

const mapStateToProps = (state, props) => ({
  branch: state.session.pullRequests.filters.branch,
  pageSize: 10,
  activePage: state.session.pullRequests.pagination.currentPage,
  total: state.session.pullRequests.pagination.total,
  status: getPageFetchStatus(state),
  items: getPullRequestsPage(state) || [],
  orderBy: state.session.pullRequests.orderBy,
})

function PullRequests(props: Props) {
  return (
    <div>
      <PullRequestsPaginated
        hideRepoSelect
        mapStateToProps={mapStateToProps}
        fetchData={fetchPullRequests}
        repo={props.repo}
      />
    </div>
  )
}

export default PullRequests

