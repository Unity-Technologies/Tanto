/* @flow */

export type Props = {
  totalUserPRs?: number,
  totalUserAssignedPRs?: number,
};

/* eslint-disable */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Tabs, Tab, Badge } from 'react-bootstrap'
import UserPullRequestList from './UserPullRequestList'
import AssignedPullRequestList from './AssignedPullRequestList'
import './styles.css'

const tabTitle = (text, badge) => (
  <div style={{ display: 'inline-flex' }}>
    <div style={{ float: 'left', marginRight: '5px' }}>{text}</div>
    {!!badge && <div className="tab-badge">{badge}</div>}
  </div>
)

function PullRequests(props) {
  const { totalOwned, totalAssigned } = props
  return (
    <div>
      <Helmet title="Pull Requests" />
      <div >
        <Tabs animation={false} defaultActiveKey={1}>
          <Tab
            id="userPullRequestsTab"
            eventKey={1}
            className="tab"
            title={tabTitle('Pull requests on review', totalAssigned)}
          >
            <AssignedPullRequestList />
          </Tab>
          <Tab
            id="userAssignedPullRequestsTab"
            eventKey={2}
            className="tab"
            title={tabTitle('My pull requests', totalOwned)}
          >
            <UserPullRequestList />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    totalOwned: state.session.pullRequestsOwned.total,
    totalAssigned: state.session.pullRequestsAssigned.total,
  })
)(PullRequests)

