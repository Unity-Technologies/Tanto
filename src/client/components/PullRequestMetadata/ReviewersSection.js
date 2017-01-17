/* @ flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'

import type {
  PullRequestReviewerStatusType, PullRequestReviewerType,
} from 'services/ono/queries/pullRequest'
import Reviewers from './Reviewers'
import constants from 'universal/constants'
import pureComponent from 'universal/react-pure-render'

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

const inProgress = {
  borderLeft: '5px solid #f7e99c',
}

const inProgressColor = 'rgb(198, 149, 10)'
const approvedColor = '#3f855b'
const rejectedColor = '#e96666'

type ReviewersSectionProps = {
  reviewers: Array<PullRequestReviewerType>,
  onAddReviewer: Function,
  onToggleReviewers: Function,
  toggleReviewers: boolean,
}

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

const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const ReviewersSection = (props: ReviewersSectionProps) => {
  const { reviewers, onAddReviewer, onToggleReviewers, toggleReviewers } = props

  // Lodash groupBy is not really what we want here, all groups should be represented.
  type GroupsType = { [key: PullRequestReviewerStatusType]: Array<PullRequestReviewerType> }
  const reviewerGroups: GroupsType = {
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
              <Reviewers reviewers={props.reviewers} onAdded={onAddReviewer} />
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

export default pureComponent(ReviewersSection)
