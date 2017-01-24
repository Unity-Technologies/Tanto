/* @flow */
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import type { UserType } from 'universal/types'
import { connect } from 'react-redux'
import type {
  PullRequestReviewerStatusType, PullRequestReviewerType,
} from 'services/ono/queries/pullRequest'
import ReviewerSelection from './ReviewerSelection'
import constants from 'universal/constants'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { getUsers } from 'ducks/users/selectors'
import { createSelector } from 'reselect'
import ReviewerList from './ReviewerList'

export const getReviews = createSelector(
  getPullRequest,
  (pr) => (pr ? pr.reviewers : [])
)

type ReviewersSectionProps = {
  reviews: Array<PullRequestReviewerType>,
  onToggleReviewer: Function,
  onToggleReviewers: Function,
  toggleReviewers: boolean,
  users: Array<UserType>,
  id: string
}

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}
const rejectedColor = '#e96666'
const approvedColor = '#3f855b'
const inProgress = {
  borderLeft: '5px solid #f7e99c',
}

const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const inProgressColor = 'rgb(198, 149, 10)'

class ReviewSection extends Component {
  constructor(props) {
    super(props)
    this.state = { toggleReviewers: false }
  }
  props: ReviewersSectionProps

  onToggleReviewer = () => { }

  onToggleReviewers = () => {
    const newState = !this.state.toggleReviewers
    this.setState({ toggleReviewers: newState })
  }

  render() {
    const { reviews, users } = this.props

    // Lodash gr oupBy is not really what we want here, all groups should be represented.
    type GroupsType = { [key: PullRequestReviewerStatusType]: Array<PullRequestReviewerType> }
    const reviewerGroups: GroupsType = {
      not_reviewed: reviews.filter(r => !r.status || r.status === constants.PR_NOT_REVIEWED),
      approved: reviews.filter(r => r.status === constants.PR_APPROVED),
      rejected: reviews.filter(r => r.status === constants.PR_REJECTED),
      under_review: reviews.filter(r => r.status === constants.PR_UNDER_REVIEW),
    }

    let status
    let statusColor
    let statusExtraText
    if (reviews.length === 0) {
      status = constants.PR_NOT_REVIEWED
      statusColor = inProgressColor
    } else if (reviewerGroups.approved.length === reviews.length) {
      status = constants.PR_APPROVED
      statusColor = approvedColor
    } else if (reviewerGroups.rejected.length === reviews.length) {
      status = constants.PR_REJECTED
      statusColor = rejectedColor
    } else {
      status = constants.PR_UNDER_REVIEW
      statusColor = inProgressColor
      const pendingReviewCount =
        reviewerGroups.under_review.length + reviewerGroups.not_reviewed.length
      statusExtraText = `(${pendingReviewCount} pending responses)`
    }

    const reviewers = new Set(reviews.map(x => x.user.username))

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
            {this.state.toggleReviewers &&
              <Row style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                <ReviewerSelection
                  onToggleReviewer={this.onToggleReviewer}
                  reviewers={reviewers}
                  users={users}
                />
              </Row>
            }
          </Col>
          <Col md={1}>
            <div
              onClick={this.onToggleReviewers}
              style={{ color: 'rgb(159, 217, 237)', float: 'right', fontSize: '20px', cursor: 'pointer' }}
            >
              <i className="fa fa-pencil" aria-hidden="true" />
            </div>
          </Col>
        </Row>
      </ListGroupItem>
    )
  }
}

export default connect((state, props) => ({
  reviews: getReviews(state, props),
  users: getUsers(state, props),
}))(ReviewSection)

