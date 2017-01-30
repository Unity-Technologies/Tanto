/* flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { connect } from 'react-redux'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import { types } from 'ducks/pullrequests/actions'
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

export const fetchStatus = statusFetchCreator(types.FETCH_PULL_REQUEST_METADATA)

export type PullRequestSummaryPropsType = {
  status: StatusType,
  dispatch: Function,
  pullRequestId: string,
  pullRequestExists: boolean,
}

export const getMetadata = createStructuredSelector({
  status: fetchStatus,
})

const PullRequestSummary = (props: PullRequestSummaryPropsType) =>
  <LoadingComponent status={props.status}>
    <div className="PullRequestSummary">
      <Header id={props.pullRequestId} />
      <Row>
        <Col md={12}>
          <ListGroup style={{ marginTop: '20px' }}>
            <ChangesetSection id={props.pullRequestId} />
            <RepositoriesSection id={props.pullRequestId} />
            <ReviewSection id={props.pullRequestId} />
            <BuildSection id={props.pullRequestId} />
            <IssuesSection id={props.pullRequestId} />
          </ListGroup>
        </Col>
      </Row>
    </div>
  </LoadingComponent>


export default connect(getMetadata)(PullRequestSummary)

