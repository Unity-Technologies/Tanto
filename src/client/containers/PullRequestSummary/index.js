/* @flow */
import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { connect } from 'react-redux'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import { fetchPullRequestData } from 'ducks/pullrequests/actions'
import BuildSection from './BuildSection'
import ChangesetSection from './ChangesetSection'
import Header from './Header'
import type { StatusType } from 'ducks/pullrequests/selectors'
import { createStructuredSelector } from 'reselect'
import IssuesSection from './IssuesSection'
import RepositoriesSection from './RepositoriesSection'
import ReviewSection from './ReviewSection'
import { statusFetchCreator } from 'ducks/fetch'
import LoadingComponent from 'components/LoadingComponent'
import pullRequestMetadataQuery from './pullRequestMetadata.graphql'

const action = 'component/PULL_REQUEST_METADATA'

export const fetchStatus = statusFetchCreator(action)

export type PullRequestSummaryPropsType = {
  status: StatusType,
  dispatch: Function,
  pullRequestId: string,
  pullRequestExists: boolean,
}


export const getMetadata = createStructuredSelector({
  status: fetchStatus,
})

class PullRequestSummary extends Component {
  componentDidMount() {
    this.props.dispatch(
      fetchPullRequestData(action, pullRequestMetadataQuery, { id: this.props.pullRequestId }))
  }
  props: PullRequestSummaryPropsType

  render() {
    return (
      <LoadingComponent status={this.props.status}>
        <div className="PullRequestSummary">
          <Header id={this.props.pullRequestId} />
          <Row>
            <Col md={12}>
              <ListGroup style={{ marginTop: '20px' }}>
                <ChangesetSection id={this.props.pullRequestId} />
                <RepositoriesSection id={this.props.pullRequestId} />
                <ReviewSection id={this.props.pullRequestId} />
                <BuildSection id={this.props.pullRequestId} />
                <IssuesSection id={this.props.pullRequestId} />
              </ListGroup>
            </Col>
          </Row>
        </div>
      </LoadingComponent>
    )
  }
}

export default connect(getMetadata)(PullRequestSummary)

