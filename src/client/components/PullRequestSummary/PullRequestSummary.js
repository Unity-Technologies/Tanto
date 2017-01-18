/* @flow */
import moment from 'moment'
import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'

import type {
  PullRequestGraphType, PullRequestReviewerStatusType, PullRequestReviewerType,
} from 'services/ono/queries/pullRequest'
import ReviewerSelection from './ReviewerSelection'
import UserAvatar from '../UserAvatar'
import { pluralizedText } from 'utils/text'
import constants from 'universal/constants'
import pureComponent from 'universal/react-pure-render'

import { prReviewers, prUsers } from '../../api/testPullRequest'


const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const info = {
  borderLeft: '5px solid rgba(226, 231, 245, 0.62)',
}

const inProgress = {
  borderLeft: '5px solid #f7e99c',
}

const danger = {
  borderLeft: '5px solid rgb(255, 208, 208)',
}

const success = {
  borderLeft: '5px solid rgb(214, 247, 229)',
}

const inProgressColor = 'rgb(198, 149, 10)'
const approvedColor = '#3f855b'
const rejectedColor = '#e96666'
const dangerColor = '#e96666'

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

export type PullRequestSummaryPaths = {
  origin: {
    url: string,
    label: string,
  },
  target: {
    url: string,
    label: string,
  }
}

export const PullRequestHeader = ({ pullRequest } : { pullRequest: PullRequestGraphType }) =>
  <div style={{ display: 'inline-block' }}>
    <UserAvatar
      src={null}  // FIXME
      style={{ float: 'left', display: 'table-column' }}
    />
    <div style={{ padding: '0 10px', display: 'table' }}>
      <div style={{ fontSize: '16px' }}>
        <strong>{pullRequest.title}</strong>
      </div>
      <span style={{ color: 'grey', fontSize: '13px' }}>
        created {moment(pullRequest.created).fromNow()}
        {' '} by {pullRequest.owner.fullName} ({pullRequest.owner.username})
      </span>
    </div>
  </div>


export const ChangesSection = ({ pullRequest } : { pullRequest: PullRequestGraphType }) =>
  <ListGroupItem style={info}>
    <Row>
      <Col md={5}>
        <div style={headerColumnStyle}>
          Changes
        </div>
      </Col>
      <Col md={7}>
        <div>
          {/* TODO: additions/deletions could be moved to backend */}
          <span>{pluralizedText('file', 'files', pullRequest.files.length)} changed</span><br />
          <span style={{ color: '#55a532' }}>
            + {pullRequest.files.reduce((sum, f) => sum + f.stats.added, 0)}
          </span>
          <span style={{ color: '#bd2c00' }}>
            {' '}− {pullRequest.files.reduce((sum, f) => sum + f.stats.deleted, 0)}
          </span>
        </div>
      </Col>
    </Row>
  </ListGroupItem>


type RepositoriesSectionProps = {
  paths: PullRequestSummaryPaths,
}

export const RepositoriesSection = (props: RepositoriesSectionProps) =>
  <ListGroupItem style={info}>
    <Row>
      <Col md={5}>
        <div style={headerColumnStyle}>
          Repositories
        </div>
      </Col>
      <Col md={7}>
        <div>
          Origin: <a href={props.paths.origin.url}>{props.paths.origin.label}</a>
          <br />
          Target: <a href={props.paths.target.url}>{props.paths.target.label}</a>
        </div>
      </Col>
    </Row>
  </ListGroupItem>


const ReviewerList = ({ reviewers, icon, tooltip }) => {
  if (reviewers.length === 0) {
    return null
  }
  const tooltipOverlay = <Tooltip id="tooltip">{tooltip}</Tooltip>
  return (
    <li>
      <span>
        <OverlayTrigger placement="left" overlay={tooltipOverlay}>
          <i
            style={{ marginRight: '12px', width: '12px', marginBottom: '6px' }}
            className={`fa ${icon}`}
          />
        </OverlayTrigger>
        {reviewers.map(r => r.user.fullName).join(', ')}
      </span>
    </li>
  )
}

type ReviewersSectionProps = {
  reviewers: Array<PullRequestReviewerType>,
  onToggleReviewer: Function,
  onToggleReviewers: Function,
  toggleReviewers: boolean,
}

export const ReviewersSection = (props: ReviewersSectionProps) => {
  const { reviewers, onToggleReviewer, onToggleReviewers, toggleReviewers } = props

  // Lodash groupBy is not really what we want here, all groups should be represented.
  type GroupsType = { [key: PullRequestReviewerStatusType]: Array<PullRequestReviewerType> }
  const reviewerGroups : GroupsType = {
    not_reviewed: reviewers.filter(r => r.status === constants.PR_NOT_REVIEWED),
    approved: reviewers.filter(r => r.status === constants.PR_APPROVED),
    rejected: reviewers.filter(r => r.status === constants.PR_REJECTED),
    under_review: reviewers.filter(r => r.status === constants.PR_UNDER_REVIEW),
  }

  let status
  let statusColor
  let statusExtraText
  if (reviewers.length === 0) {
    status = 'no reviewers'
    statusColor = inProgressColor
  } else if (reviewerGroups.approved.length === reviewers.length) {
    status = 'approved'
    statusColor = approvedColor
  } else if (reviewerGroups.rejected.length === reviewers.length) {
    status = 'rejected'
    statusColor = rejectedColor
  } else {
    status = 'in progress'
    statusColor = inProgressColor
    const pendingReviewCount =
      reviewerGroups.under_review.length + reviewerGroups.not_reviewed.length
    statusExtraText = `(${pendingReviewCount} pending responses)`
  }

  return (
    <ListGroupItem style={inProgress}>
      <Row>
        <Col md={2}>
          <div style={headerColumnStyle}>
            Code review
          </div>
        </Col>
        <Col md={3}>
          {subHeader('Status:')}
          <div style={{ color: statusColor, textTransform: 'uppercase' }}>
            {status}
          </div>
          <div style={{ fontSize: '12px' }}>{statusExtraText}</div>
        </Col>
        <Col md={6}>
          {subHeader('Reviewers:')}
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
            <ReviewerList
              reviewers={reviewerGroups.not_reviewed}
              icon={'fa-envelope-o'}
              tooltip={'Not reviewed yet'}
            />
            <ReviewerList
              reviewers={reviewerGroups.under_review}
              icon={'fa-envelope-open-o'}
              tooltip={'Under review'}
            />
            <ReviewerList
              reviewers={reviewerGroups.approved}
              icon={'fa-thumbs-o-up'}
              tooltip={'Approved'}
            />
            <ReviewerList
              reviewers={reviewerGroups.rejected}
              icon={'fa-thumbs-o-down'}
              tooltip={'Rejected'}
            />
          </ul>
          {toggleReviewers &&
            <Row style={{ paddingTop: '20px', paddingLeft: '50px' }}>
              <ReviewerSelection
                onToggleReviewer={onToggleReviewer}
                reviewers={prReviewers}
                users={prUsers}
              />
            </Row>
          }
        </Col>
        <Col md={1}>
          <div
            onClick={onToggleReviewers}
            style={{ color: '#dbdedf', float: 'right', fontSize: '20px', cursor: 'pointer' }}
          >
            <i className="fa fa-pencil" aria-hidden="true" />
          </div>
        </Col>
      </Row>
    </ListGroupItem>
  )
}


export const BuildSection = ({ pullRequest } : { pullRequest: PullRequestGraphType }) =>
  <ListGroupItem style={success}>
    <Row>
      <Col md={2}>
        <div style={headerColumnStyle}>
          Katana build
        </div>
      </Col>
      <Col md={3}>
        {subHeader('Status:')}
        <div>
          <div style={{ color: approvedColor, textTransform: 'uppercase' }}>
            Passed
          </div>
          <div style={{ fontSize: '12px' }}>(5 hours ago)</div>
        </div>
      </Col>
      <Col md={6}>
        <div>
          <div>
            {subHeader('Latest:')}
            <a href="#">ABV-48147</a>
            <div style={{ fontSize: '12px' }}>(5 builds in total)</div>
          </div>
        </div>
      </Col>
      <Col md={1} />
    </Row>
  </ListGroupItem>


export const IssuesSection = ({ pullRequest } : { pullRequest: PullRequestGraphType }) =>
  <ListGroupItem style={danger}>
    <Row>
      <Col md={2}>
        <div style={headerColumnStyle}>
          PR Issues
        </div>
      </Col>
      <Col md={3}>
        {subHeader('Status:')}
        <div style={{ color: dangerColor, textTransform: 'uppercase' }}>
          UNRESOLVED
        </div>
        <div style={{ fontSize: '12px' }}>(12 issue)</div>
      </Col>
      <Col md={6}>
        <div>
          <div>
            {subHeader('Unresolved:')}
            <div><a href="#"># Rename to MdFourGenerator_Deprecated</a></div>
            <div><a href="#"># Template typename TValue, typename TNode</a></div>
          </div>
        </div>
      </Col>
      <Col md={1}>
        <div style={{ color: '#dbdedf', float: 'right', fontSize: '20px' }}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </div>
      </Col>
    </Row>
  </ListGroupItem>


type PullRequestSummaryProps = {
  pullRequest: PullRequestGraphType,
} & ReviewersSectionProps & RepositoriesSectionProps

const PullRequestSummary = (props: PullRequestSummaryProps) =>
  <div className="PullRequestSummary">
    <PullRequestHeader pullRequest={props.pullRequest} />
    <Row>
      <Col md={12}>
        <ListGroup style={{ marginTop: '20px' }}>
          <ChangesSection pullRequest={props.pullRequest} />
          <RepositoriesSection paths={props.paths} />
          <ReviewersSection
            onToggleReviewer={props.onToggleReviewer}
            onToggleReviewers={props.onToggleReviewers}
            reviewers={props.pullRequest.reviewers}
            toggleReviewers={props.toggleReviewers}
          />
          <BuildSection {...props} />
          <IssuesSection {...props} />
        </ListGroup>
      </Col>
    </Row>
  </div>

export default pureComponent(PullRequestSummary)
