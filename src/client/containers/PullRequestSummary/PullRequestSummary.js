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
import ReviewersSection from 'components/PullRequestMetadata/ReviewersSection'


class PullRequestSummary extends Component {
  componentDidMount() {
    // dispatch(fetchPullRequestMetadata())
  }
  render() {
    return (
      <div className="PullRequestSummary">
        <Header />
        <Row>
          <Col md={12}>
            <ListGroup style={{ marginTop: '20px' }}>
              <ChangesSection />
              <RepositoriesSection />
              <ReviewersSection />
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
