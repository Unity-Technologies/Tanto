/* flow */

import React from 'react'
import { connect } from 'react-redux'
import { pureComponent } from 'components/PureComponent'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import { types } from 'ducks/pullrequests/actions'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import PullRequestDiscussion from 'containers/PullRequestDiscussion'
import type { StatusType } from 'ducks/pullrequests/selectors'
import { createStructuredSelector } from 'reselect'
import LoadingComponent from 'components/LoadingComponent'
import BuildSection from './BuildSection'
import ChangesetSection from './ChangesetSection'
import IssuesSection from './IssuesSection'
import RepositoriesSection from './RepositoriesSection'
import ReviewSection from './ReviewSection'
import Iterations from './Iterations'
import Header from './Header'
import './PullRequestSummary.css'

export const fetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_METADATA)

export type PullRequestSummaryPropsType = {
  status: StatusType,
  pullRequestId: string,
}

export const getMetadata = createStructuredSelector({
  status: fetchStatus,
})

const style = { margin: '0 15px' }
const metadataStyle = { marginTop: '20px', marginLeft: '60px' }
const PullRequestSummary = (props: PullRequestSummaryPropsType) =>
  (<div style={style}>
    <LoadingComponent status={props.status}>
      <div className="PullRequestSummary">
        <Header id={props.pullRequestId} />
        <ListGroup style={metadataStyle}>
          <ChangesetSection id={props.pullRequestId} />
          <RepositoriesSection id={props.pullRequestId} />
          <ReviewSection id={props.pullRequestId} />
          <BuildSection id={props.pullRequestId} />
          <IssuesSection id={props.pullRequestId} />
          <Iterations id={props.pullRequestId} />
        </ListGroup>
      </div>
    </LoadingComponent>
    <PullRequestDiscussion pullRequestId={props.pullRequestId} repoName={props.repoName} />
  </div>)

export default connect(getMetadata)(pureComponent(PullRequestSummary))

