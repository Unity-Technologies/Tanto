// TODO: enable flow

import React from 'react'
import Helmet from 'react-helmet'

import PullRequestContainer from 'containers/PullRequestContainer'
import { fetchPullRequests } from 'ducks/pullrequests'
import {
  getPageFetchStatus,
  getPageFetchError,
  getPullRequests } from 'ducks/pullrequests/selectors'

export type Props = {
  project_pullrequests: Array<any>,
  params: {
    id: string,
  },
  items: Array<any>,
}

const mapStateToProps = (state, props) => ({
  branch: state.pullrequests.filters.branch,
  pageSize: 10,
  activePage: state.pullrequests.pagination.currentPage,
  total: state.pullrequests.pagination.total,
  isFetching: getPageFetchStatus(state),
  error: getPageFetchError(state),
  items: getPullRequests(state) || [],
  orderBy: state.session.pullRequestsOwned.orderBy,
})

function PullRequests(props: Props) {
  return (
    <div>
      <Helmet title="Project Pull Requests" />
      <PullRequestContainer
        hideRepoSelect
        mapStateToProps={mapStateToProps}
        fetchData={fetchPullRequests}
        repo={props.params.id}
      />
    </div>
  )
}

export default PullRequests
