// TODO: enable flow

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import PullRequestsPaginated from 'containers/PullRequestsPaginated'
import { fetchPullRequests } from 'ducks/pullrequests/actions'
import { getRepositoryId } from 'ducks/repositories/selectors'

import {
  getPageFetchStatus,
  getPullRequestsPage,
  getRepoPullRequestsPageSettings,
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
  ...getRepoPullRequestsPageSettings(state, props),
  pageSize: 10,
  status: getPageFetchStatus(state),
  items: getPullRequestsPage(state) || [],
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

export default connect(
  (state, props) => ({
    repo: getRepositoryId(state, props),
  })
)(PullRequests)

