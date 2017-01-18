/* @flow */
import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

import ListGroup from 'react-bootstrap/lib/ListGroup'

import BuildSection from 'components/PullRequestMetadata/BuildSection'
import ChangesSection from 'components/PullRequestMetadata/ChangesSection'
import Header from 'components/PullRequestMetadata/Header'
import IssuesSection from 'components/PullRequestMetadata/IssuesSection'
import RepositoriesSection from 'components/PullRequestMetadata/RepositoriesSection'
import ReviewerSection from 'components/PullRequestMetadata/ReviewerSection'
import { prReviewers, prUsers } from '../../api/testPullRequest'


class PullRequestSummary extends Component {
  componentDidMount() {
    // dispatch(fetchPullRequestMetadata())
  }
  render() {
    const { reviewers, onToggleReviewer, onToggleReviewers, toggleReviewers } = props

    return (
      <div className="PullRequestSummary">
        <Header />
        <Row>
          <Col md={12}>
            <ListGroup style={{ marginTop: '20px' }}>
              <ChangesSection />
              <RepositoriesSection />
              <ReviewerSelection
                onToggleReviewer={onToggleReviewer}
                reviewers={prReviewers}
                users={prUsers}
              />

              <BuildSection />
              <IssuesSection />
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PullRequestSummary
