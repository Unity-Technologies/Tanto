/* flow */

import React from 'react'
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
import { statusFetchFactory } from 'ducks/fetch/selectors'
import PullRequestDiscussion from 'containers/PullRequestDiscussion'
import LoadingComponent from 'components/LoadingComponent'

export const fetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_METADATA)

export type PullRequestSummaryPropsType = {
  status: StatusType,
  dispatch: Function,
  pullRequestId: string,
  pullRequestExists: boolean,
}

export const getMetadata = createStructuredSelector({
  status: fetchStatus,
})

const style = { margin: '0 15px' }
const metadataStyle = { marginTop: '20px', marginLeft: '60px' }
const PullRequestSummary = (props: PullRequestSummaryPropsType) =>
  <div style={style}>
    <LoadingComponent status={props.status}>
      <div className="PullRequestSummary">
        <Header id={props.pullRequestId} />
        <ListGroup style={metadataStyle}>
          <ChangesetSection id={props.pullRequestId} />
          <RepositoriesSection id={props.pullRequestId} />
          <ReviewSection id={props.pullRequestId} />
          <BuildSection id={props.pullRequestId} />
          <IssuesSection id={props.pullRequestId} />
        </ListGroup>
      </div>
    </LoadingComponent>
    <PullRequestDiscussion pullRequestId={props.pullRequestId} repoName={props.repoName} />
  </div>

export default connect(getMetadata)(PullRequestSummary)

