/* @flow */
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { Button } from 'react-bootstrap'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import type {
  UserType,
  PullRequestReviewerStatusType,
  PullRequestReviewerType,
  PullRequestMissingReviewerType,
} from 'universal/types'
import { connect } from 'react-redux'
import ReviewerSelection from './ReviewerSelection'

import { getPullRequest } from 'ducks/pullrequests/selectors'
import { getUsers } from 'ducks/users/selectors'
import { createSelector } from 'reselect'
import ReviewerList from './ReviewerList'
import MissingReviewerList from './MissingReviewerList'
import { ChangesetStatus } from 'universal/constants'
import { fetchPullRequestAddReviewers, fetchPullRequestRemoveReviewers } from 'ducks/pullrequests/actions'

export const getReviews = createSelector(
  getPullRequest,
    (pr) => (pr && pr.reviews ? pr.reviews : [])
)

const createReviewSelector = (filter) => createSelector(
  getPullRequest,
  pr => {
    let reviews = pr && pr.reviews ? pr.reviews : []
    return reviews.filter(filter) || []
  }
)

export const getNotReviewed = createReviewSelector(r => !r.status || r.status === ChangesetStatus.NOT_REVIEWED)
export const getApproved = createReviewSelector(r => r.status === ChangesetStatus.APPROVED)
export const getRejected = createReviewSelector(r => r.status === ChangesetStatus.REJECTED)
export const getUnderReview = createReviewSelector(r => r.status === ChangesetStatus.UNDER_REVIEW)

export const getMissingReviewers = createSelector(
  getPullRequest,
    (pr) => (pr && pr.missingReviewers ? pr.missingReviewers : [])
)

type ReviewersSectionProps = {
  reviews: Array<PullRequestReviewerType>,
  not_reviewed: Array<PullRequestReviewerType>,
  approved: Array<PullRequestReviewerType>,
  rejected: Array<PullRequestReviewerType>,
  under_review: Array<PullRequestReviewerType>,
  users: Array<UserType>,
  id: string,
  missingReviewers: PullRequestMissingReviewerType,
  addReviewers: Function,
  removeReviewers: Function,
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
  const { reviews } = props
  let status
  let statusColor
  let statusExtraText
  if (reviews && reviews.length === 0) {
    status = ChangesetStatus.NOT_REVIEWED
    statusColor = inProgressColor
  } else if (props.approved.length === reviews.length) {
    status = ChangesetStatus.APPROVED
    statusColor = approvedColor
  } else if (props.rejected.length === reviews.length) {
    status = ChangesetStatus.REJECTED
    statusColor = rejectedColor
  } else {
    status = ChangesetStatus.UNDER_REVIEW
    statusColor = inProgressColor
    const pendingReviewCount =
      props.under_review.length + state.not_reviewed.length
    statusExtraText = `(${pendingReviewCount} pending responses)`
  }

  return { status, statusColor, statusExtraText }
}

class ReviewSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      added: [],
      removed: [],
      not_reviewed: getNotReviewed({}, props),
    }
  }

  state: {
    added: Array<UserType>,
    removed: Array<UserType>,
    not_reviewed: Array<PullRequestReviewerType>
  }

  igetNotReviewed = props => props.reviews ? props.reviews.filter(r => !r.status || r.status === ChangesetStatus.NOT_REVIEWED) : []

  componentWillMount()
  {
    this.setState(
      {
        not_reviewed: this.igetNotReviewed(this.props)
      }
    )
  }

  componentWillReceiveProps(nextProps)
  {
    if (this.props === nextProps)
      return

    this.setState(
      {
        added: [],
        removed: [],
        not_reviewed: this.igetNotReviewed(nextProps)
      }
    )
  }

  // TODO: aiting for API to add/remove reviewers
  props: ReviewersSectionProps

  addReviewer(reviewer: UserType)
  {
    let removed = this.state.removed.findIndex(r => r.id === reviewer.id) != -1

    this.setState({
      added: removed ? this.state.added : this.state.added.concat(reviewer),
      removed: this.state.removed.filter(r => r.id !== reviewer.id),
    })
  }

  removeReviewer(reviewer: UserType)
  {
    let added = this.state.added.findIndex(r => r.id === reviewer.id) != -1

    this.setState(
      {
        added: this.state.added.filter(a => a.id !== reviewer.id),
        removed: added ? this.state.removed : this.state.removed.concat(reviewer),
        not_reviewed: this.state.not_reviewed.filter(nr => nr.id !== reviewer.id)
      }
    )
  }

  render() {
    const { reviews, users } = this.props
    const { status, statusColor, statusExtraText } = getStatus(this.state, this.props)
    const reviewers = new Set(reviews.map(x => x.user.username))

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
              <Col md={6}>
                {subHeader('Reviewers:')}
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
                  <ReviewerList
                    reviewers={this.state.not_reviewed}
                    icon={'fa-circle'}
                    tooltip={'Not reviewed yet'}
                    approval={ChangesetStatus.NOT_REVIEWED}
                    removeReviewer={this.removeReviewer.bind(this)}
                    id={this.props.id}
                  />
                  <ReviewerList
                    reviewers={this.props.under_review}
                    icon={'fa-circle'}
                    tooltip={'Under review'}
                    approval={ChangesetStatus.UNDER_REVIEW}
                    removeReviewer={this.props.removeReviewers}
                    id={this.props.id}
                  />
                  <ReviewerList
                    reviewers={this.props.approved}
                    icon={'fa-circle'}
                    tooltip={'Approved'}
                    approval={ChangesetStatus.APPROVED}
                    removeReviewer={this.props.removeReviewers}
                    id={this.props.id}
                  />
                  <ReviewerList
                    reviewers={this.props.rejected}
                    icon={'fa-circle'}
                    tooltip={'Rejected'}
                    approval={ChangesetStatus.REJECTED}
                    removeReviewer={this.props.removeReviewers}
                    id={this.props.id}
                  />
                  <MissingReviewerList
                    id={this.props.id}
                    missingReviewers={this.props.missingReviewers}
                    addReviewer={this.props.addReviewers} />
                </ul>
                <Row style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                  <ReviewerSelection
                    reviewers={reviewers}
                    users={users}
                    id={this.props.id}
                    addReviewers={this.props.addReviewers}
                  />
                </Row>
                <Row style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                  {(this.state.added.length > 0 || this.state.removed.length > 0) &&
                    <Button>Save</Button>
                  }
                  </Row>
              </Col>
            </Row>
          </ListGroupItem>}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    reviews: getReviews(state, props) || [],
    users: getUsers(state, props),
    missingReviewers: getMissingReviewers(state, props) || [],
    approved: getApproved(state, props),
    rejected: getRejected(state, props),
    under_review: getUnderReview(state, props),
  }
)

const mapDispatchToProps = (dispatch) => {
  return {
    addReviewers: (id, reviewers) => dispatch(fetchPullRequestAddReviewers(id, reviewers)),
    removeReviewers: (id, reviewers) => dispatch(fetchPullRequsetRemoveReviewers(id, reviewers))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSection)

