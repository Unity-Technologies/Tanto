/* eslint-disable */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Tabs, Tab, Badge } from 'react-bootstrap'
import UserPullRequestList from './UserPullRequestList'
import AssignedPullRequestList from './AssignedPullRequestList'
import './styles.css'

const tabTitle = (text, badge) => (
  <div style={{ display: 'inline-flex' }}>
    <div style={{ float: 'left', marginRight: '5px' }}>{text}</div>
    {!!badge && <div style={{ marginRight: '15px' }}><Badge>{badge}</Badge></div>}
  </div>
)

function PullRequests(props) {
  const { totalUserPRs, totalUserAssignedPRs } = props
  return (
    <div>
      <Helmet title="Pull Requests" />
      <div >
        <Tabs animation={false} defaultActiveKey={1}>
          <Tab
            id="userPullRequestsTab"
            eventKey={1}
            className="tab"
            title={tabTitle('Pull request on review', totalUserPRs)}
          >
            <AssignedPullRequestList />
          </Tab>
          <Tab
            id="userAssignedPullRequestsTab"
            eventKey={2}
            className="tab"
            title={tabTitle('My pull request', totalUserAssignedPRs)}
          >
            <UserPullRequestList />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

PullRequests.propTypes = {
  totalUserPRs: PropTypes.number.isRequired,
  totalUserAssignedPRs: PropTypes.number.isRequired,
}

export default connect(
  state => ({
    // should come from state
    totalUserPRs: 10,
     // should come from state
    totalUserAssignedPRs: 100,
  })
)(PullRequests)

