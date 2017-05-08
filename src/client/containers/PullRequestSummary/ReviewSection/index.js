/* @flow */
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import _ from 'lodash'
import Row from 'react-bootstrap/lib/Row'
import { Button } from 'react-bootstrap'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import type {
  UserType,
    PullRequestReviewerType,
} from 'universal/types'
import { default as Select } from 'components/VirtualizedSelect'
import MissingReviewerList from './MissingReviewerList'
import {
  getPullRequestReviewStatus,
  getPullRequestReviews,
  getMissingReviewers } from './selectors'
import { getUsers } from 'ducks/users/selectors'
import ReviewerList from './ReviewerList'
import { ChangesetStatus } from 'universal/constants'
import { addPullRequestReviewers, removePullRequestReviewers } from 'ducks/pullrequests/actions'

type MissingReviewerType = {
  area: string,
  reviewers: Array<UserType>,
}

type ReviewsSectionProps = {
  status: string,
  reviews: Array<PullRequestReviewerType>,
  missingReviewers: Array<MissingReviewerType>,
  users: Array<UserType>,
  dispatch: Function,
  id: string,
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
const inProgressColor = 'rgb(198, 149, 10)'

const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const getStatus = (status: string, reviews: Array<Object>) => {
  let color
  let statusText = ''
  let statusTitle = status
  const pendingCount = reviews.filter(review => !review.status ||
    review.status === ChangesetStatus.UNDER_REVIEW ||
    ChangesetStatus.NOT_REVIEWED).length

  switch (status) {
    case ChangesetStatus.APPROVED:
      color = approvedColor
      break
    case ChangesetStatus.REJECTED:
      color = rejectedColor
      break
    case ChangesetStatus.NOT_REVIEWED:
      color = inProgressColor
      if (pendingCount) {
        statusTitle = ChangesetStatus.UNDER_REVIEW
        statusText = `(${pendingCount} pending responses)`
      }
      break
    case ChangesetStatus.UNDER_REVIEW:
      color = inProgressColor
      if (!pendingCount) {
        statusTitle = ChangesetStatus.NOT_REVIEWED
        break
      }
      statusText = `(${pendingCount} pending responses)`
      break
    default:
      color = inProgressColor
      statusTitle = ChangesetStatus.NOT_REVIEWED

  }

  return (<div>
    {subHeader('Status:')}
    <div style={{ color, textTransform: 'uppercase' }}>
      {statusTitle}
    </div>
    <div style={{ fontSize: '12px' }}>{statusText}</div>
  </div>)
}

type SelectItem = {
  label: string,
  value: string
}

class ReviewSection extends Component {
  constructor(props: ReviewsSectionProps) {
    super(props)

    this.state = {
      added: [],
      removed: [],
    }
  }

  state: {
    added: Array<SelectItem>,
    removed: Array<string>,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews !== this.props.reviews) {
      this.setState({
        removed: [],
        added: [],
      })
    }
  }

  props: ReviewsSectionProps

  handleRemoveReviewer = (reviewerId: string): void => {
    this.setState({
      removed: this.state.removed.concat(reviewerId),
    })
  }

  handleOnChange = (value) => {
    this.setState({
      added: value,
    })
  }

  handleSaveReviewers = (): void => {
    const { removed, added } = this.state
    const addedReviewers = added.map(item => item.value)
    if (added.length) {
      const addedReviewersDict = addedReviewers.map(id => ({ id }))
      this.props.dispatch(addPullRequestReviewers(this.props.id, addedReviewersDict))
    }

    const diffRemoved = _.difference(removed, addedReviewers)
    if (diffRemoved.length) {
      const removedReviewersDict = diffRemoved.map(id => ({ id }))
      this.props.dispatch(removePullRequestReviewers(this.props.id, removedReviewersDict))
    }
  }

  handleAddMissingReviewer = (id, reviewer) => {
    const addedReviewers = this.state.added
    if (addedReviewers.findIndex(r => reviewer.id === r) === -1) {
      this.setState({
        added: this.state.added.concat({
          label: reviewer.fullName || reviewer.username,
          value: reviewer.id,
        }),
      })
    }
  }

  filterReviews = (status: string) => {
    if (!this.props.reviews || !this.props.reviews.length) {
      return []
    }

    const displayReviewers = this.state.removed.length ? this.props.reviews.filter(
      r => this.state.removed.indexOf(r.user.id) === -1) : this.props.reviews


    if (status === ChangesetStatus.NOT_REVIEWED) {
      return displayReviewers.filter(review => review.status === status || !review.status)
    }

    return displayReviewers.filter(review => review.status === status)
  }

  render() {
    const { users, status, reviews } = this.props

    if (!users) {
      return null
    }

    const options = users.map(u => ({
      label: u.fullName.trim() || u.username,
      value: u.id,
    }))

    return (
      <div>
        <ListGroupItem style={inProgress}>
          <Row>
            <Col md={2}>
              <div style={headerColumnStyle}>
                Code review
              </div>
            </Col>
            <Col md={3}>
              {getStatus(status, reviews)}
            </Col>
            <Col md={7}>
              {subHeader('Reviewers:')}
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
                <ReviewerList
                  tooltip={'Not reviewed yet'}
                  color="not-reviewed"
                  reviews={this.filterReviews(ChangesetStatus.NOT_REVIEWED)}
                  removeReviewer={this.handleRemoveReviewer}
                />
                <ReviewerList
                  tooltip={'Under review'}
                  color="under-review"
                  reviews={this.filterReviews(ChangesetStatus.UNDER_REVIEW)}
                  removeReviewer={this.handleRemoveReviewer}
                />
                <ReviewerList
                  tooltip={'Approved'}
                  color="approved"
                  reviews={this.filterReviews(ChangesetStatus.APPROVED)}
                  removeReviewer={this.handleRemoveReviewer}
                />
                <ReviewerList
                  tooltip={'Rejected'}
                  color="rejected"
                  reviews={this.filterReviews(ChangesetStatus.REJECTED)}
                  removeReviewer={this.handleRemoveReviewer}
                />
              </ul>

              <div style={{ paddingTop: '5px' }}>
                <div style={{ float: 'left', width: '85%' }}>
                  <Select
                    name="test"
                    value={this.state.added}
                    onChange={this.handleOnChange}
                    options={options}
                    multi
                    ignoreAccents
                    tabSelectsValue
                    placeholder="Add reviewers..."
                    className="reviewer-selection"
                  />

                  <MissingReviewerList
                    id={this.props.id}
                    missingReviewers={this.props.missingReviewers}
                    addReviewer={this.handleAddMissingReviewer}
                  />
                </div>
                <div style={{ float: 'right' }}>
                  {!!(this.state.added.length || this.state.removed.length) &&
                    <Button onClick={this.handleSaveReviewers}>Save</Button>
                  }
                </div>
              </div>
            </Col>
          </Row>
        </ListGroupItem>
      </div>
    )
  }
}

const mapStateToProps = (state, props: ReviewsSectionProps): ReviewsSectionProps => (
  {
    ...props,
    status: getPullRequestReviewStatus(state, props),
    reviews: getPullRequestReviews(state, props),
    users: getUsers(state, props),
    missingReviewers: getMissingReviewers(state, props),
  }
)

export default connect(mapStateToProps)(ReviewSection)

