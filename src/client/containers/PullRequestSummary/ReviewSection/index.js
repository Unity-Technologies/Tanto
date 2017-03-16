/* @flow */
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { Button } from 'react-bootstrap'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import type {
  UserType,
    PullRequestReviewerType,
    PullRequestMissingReviewerType,
} from 'universal/types'
import ReviewerSelection from './ReviewerSelection'

import { getPullRequest } from 'ducks/pullrequests/selectors'
import { getUsers } from 'ducks/users/selectors'
import { createSelector } from 'reselect'
import ReviewerList from './ReviewerList'
import { ChangesetStatus } from 'universal/constants'
import { addPullRequestReviewers, removePullRequestReviewers } from 'ducks/pullrequests/actions'

export const getReviews = createSelector(
  getPullRequest,
  (pr) => (pr && pr.reviews ? pr.reviews : [])
)

const createReviewSelector = (filter) => createSelector(
  getPullRequest,
  pr => {
    const reviews = pr && pr.reviews ? pr.reviews : []
    return reviews.filter(filter) || []
  }
)

export const getNotReviewed = createReviewSelector(
  r => !r.status || r.status === ChangesetStatus.NOT_REVIEWED)
export const getApproved = createReviewSelector(r => r.status === ChangesetStatus.APPROVED)
export const getRejected = createReviewSelector(r => r.status === ChangesetStatus.REJECTED)
export const getUnderReview = createReviewSelector(r => r.status === ChangesetStatus.UNDER_REVIEW)

type ReviewersSectionProps = {
  reviews: Array<PullRequestReviewerType>,
  notReviewed: Array<PullRequestReviewerType>,
  approved: Array<PullRequestReviewerType>,
  rejected: Array<PullRequestReviewerType>,
  underReview: Array<PullRequestReviewerType>,
  users: Array<UserType>,
  id: string,
  missingReviewers: PullRequestMissingReviewerType,
  changeReviewers: Function,
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

const getStatus = (state, props) => {
  const { reviews, approved, rejected, underReview, notReviewed } = props

  let status
  let statusColor
  let statusExtraText

  const un = underReview.filter(u => state.removed.findIndex(r => u.user.id === r.id) === 1)
  const nr = notReviewed.filter(u => state.removed.findIndex(r => u.user.id === r.id) === -1)
  const pendingReviewCount = un.length + nr.length + state.selection.length

  if (reviews && reviews.length === 0) {
    status = ChangesetStatus.NOT_REVIEWED
    statusColor = inProgressColor
  } else if (approved.length === reviews.length) {
    status = ChangesetStatus.APPROVED
    statusColor = approvedColor
  } else if (rejected.length === reviews.length) {
    status = ChangesetStatus.REJECTED
    statusColor = rejectedColor
  } else {
    status = ChangesetStatus.UNDER_REVIEW
    statusColor = inProgressColor
    statusExtraText = `(${pendingReviewCount} pending responses)`
  }

  if (pendingReviewCount === 0 && status === ChangesetStatus.UNDER_REVIEW) {
    status = ChangesetStatus.NOT_REVIEWED
    statusExtraText = null
  }

  if (pendingReviewCount > 0 && status === ChangesetStatus.NOT_REVIEWED) {
    status = ChangesetStatus.UNDER_REVIEW
    statusExtraText = `(${pendingReviewCount} pending responses)`
  }

  return { status, statusColor, statusExtraText }
}

class ReviewSection extends Component {
  constructor(props: ReviewersSectionProps) {
    super(props)

    this.state = {
      selection: [],
      removed: [],
      editMode: false,
    }
  }

  state: {
    selection: Array<UserType>,
    removed: Array<UserType>,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews === this.props.reviews) {
      return
    }

    this.setState({
      selection: [],
      removed: [],
    })
  }

  props: ReviewersSectionProps

  reviewerSelectionChanged = (id: string, reviewers: Array<UserType>): void => {
    this.setState({
      selection: reviewers,
    })
  }

  removeReviewer = (reviewer: UserType): void => {
    this.setState(
      {
        removed: this.state.removed.concat(reviewer),
      }
    )
  }

  handleSaveReviewers = (): void => {
    const removedReviewers = this.state.removed.map(r => ({ id: r.id }))
    const addedReviewers = this.state.selection.map(r => ({ id: r.id }))

    if (addedReviewers.length) {
      this.props.dispatch(addPullRequestReviewers(this.props.id, addedReviewers))
    }
    if (removedReviewers.length) {
      this.props.dispatch(removePullRequestReviewers(this.props.id, removedReviewers))
    }
  }

  render() {
    const { reviews, users } = this.props
    const { status, statusColor, statusExtraText } = getStatus(this.state, this.props)
    const reviewers = new Set(reviews.map(x => x.user.username))

    if (!reviews || !users) {
      return null
    }

    return (
      <div>
        {reviews && users &&
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
              <Col md={7}>
                {subHeader('Reviewers:')}
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
                  <ReviewerList
                    icon={'fa-circle'}
                    tooltip={'Not reviewed yet'}
                    approval={ChangesetStatus.NOT_REVIEWED}
                    removeReviewer={this.removeReviewer}
                    id={this.props.id}
                  />
                  <ReviewerList
                    icon={'fa-circle'}
                    tooltip={'Under review'}
                    approval={ChangesetStatus.UNDER_REVIEW}
                    removeReviewer={this.removeReviewer}
                    id={this.props.id}
                  />
                  <ReviewerList
                    icon={'fa-circle'}
                    tooltip={'Approved'}
                    approval={ChangesetStatus.APPROVED}
                    removeReviewer={this.removeReviewer}
                    id={this.props.id}
                  />
                  <ReviewerList
                    icon={'fa-circle'}
                    tooltip={'Rejected'}
                    approval={ChangesetStatus.REJECTED}
                    removeReviewer={this.removeReviewer}
                    id={this.props.id}
                  />
                </ul>

                <div style={{ paddingTop: '5px' }}>
                  <div style={{ float: 'left', width: '85%' }}>
                    <ReviewerSelection
                      reviewers={reviewers}
                      users={users}
                      id={this.props.id}
                      addReviewers={this.reviewerSelectionChanged}
                    />
                  </div>
                  <div style={{ float: 'right' }}>
                    {(this.state.selection.length > 0 || this.state.removed.length > 0) &&
                      <Button onClick={this.handleSaveReviewers}>Save</Button>
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </ListGroupItem>}
      </div>
    )
  }
}

const mapStateToProps = (state, props: ReviewersSectionProps): ReviewersSectionProps => (
  {
    ...props,
    reviews: getReviews(state, props),
    users: getUsers(state, props),
    notReviewed: getNotReviewed(state, props),
    approved: getApproved(state, props),
    rejected: getRejected(state, props),
    underReview: getUnderReview(state, props),
  }
)

export default connect(mapStateToProps)(ReviewSection)

