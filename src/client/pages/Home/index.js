/* @flow */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import PullRequestsPaginated from 'containers/PullRequestsPaginated'
import { fetchUserPullRequests, fetchUserAssignedPullRequests } from 'ducks/session/actions'
import {
  getPullRequestsOwned,
  getPullRequestsAssigned,
  getPullRequestsOwnedTotal,
  getPullRequestsAssignedTotal,
  getOwnedFetchStatus,
  getAssignedFetchStatus,
} from 'ducks/session/selectors'

import './styles.css'

const tabTitle = (text, badge) => (
  <div style={{ display: 'inline-flex' }}>
    <div style={{ float: 'left', marginRight: '5px' }}>{text}</div>
    {!!badge && <div className="tab-badge">{badge}</div>}
  </div>
)

const mapStateToPropsOwned = (state, props) => ({
  repo: state.session.pullRequestsOwned.filters.repo,
  branch: state.session.pullRequestsOwned.filters.branch,
  pageSize: 3,
  activePage: state.session.pullRequestsOwned.pagination.currentPage,
  total: state.session.pullRequestsOwned.pagination.total,
  status: getOwnedFetchStatus(state),
  items: getPullRequestsOwned(state) || [],
  orderBy: state.session.pullRequestsOwned.orderBy,
})

const mapStateToPropsAssigned = (state, props) => ({
  repo: state.session.pullRequestsAssigned.filters.repo,
  branch: state.session.pullRequestsAssigned.filters.branch,
  pageSize: 3,
  activePage: state.session.pullRequestsAssigned.pagination.currentPage,
  total: state.session.pullRequestsAssigned.pagination.total,
  status: getAssignedFetchStatus(state),
  items: getPullRequestsAssigned(state) || [],
  orderBy: state.session.pullRequestsAssigned.orderBy,
})


export type Props = {
  totalOwned?: number,
  totalAssigned?: number,
}

function Home(props: Props) {
  const { totalOwned, totalAssigned } = props
  return (
    <div>
      <Helmet title="Pull Requests" />
      <div >
        <Tabs animation={false} defaultActiveKey={1}>
          <Tab
            key="tab1"
            eventKey={1}
            className="tab"
            title={tabTitle('Pull requests on review', totalAssigned)}
          >
            <PullRequestsPaginated
              mapStateToProps={mapStateToPropsAssigned}
              fetchData={fetchUserAssignedPullRequests}
            />
          </Tab>
          <Tab
            key="tab2"
            eventKey={2}
            className="tab"
            title={tabTitle('My pull requests', totalOwned)}
          >
            <PullRequestsPaginated
              mapStateToProps={mapStateToPropsOwned}
              fetchData={fetchUserPullRequests}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    totalOwned: getPullRequestsOwnedTotal(state),
    totalAssigned: getPullRequestsAssignedTotal(state),
  })
)(Home)

