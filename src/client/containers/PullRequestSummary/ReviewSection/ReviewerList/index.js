/* @flow eslint-disable react/no-multi-comp */

import React, {Component} from 'react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import './ReviewerList.css'
import { ChangesetStatus } from 'universal/constants'
import type { PullRequestReviewerType } from 'universal/types'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { getPullRequest } from 'ducks/pullrequests/selectors'

export type ReviewerListType = {
  reviewers: Array<PullRequestReviewerType>,
  icon: string,
  tooltip: string,
  approval: $Keys<typeof ChangesetStatus>, // eslint-disable-line no-undef
  removeReviewer: Function,
  id: string,
}

const getStateClass = (state: string) => {
  switch (state) {
    case ChangesetStatus.APPROVED:
      return 'approved'
    case ChangesetStatus.REJECTED:
      return 'rejected'
    case ChangesetStatus.UNDER_REVIEW:
      return 'under-review'
    default:
      return 'not-reviewed'
  }
}

const getClass = (icon: string, state: string) => `fa ${icon} ${getStateClass(state)}`

export const getReviews = createSelector(
  getPullRequest,
  (pr) => (pr && pr.reviews ? pr.reviews : [])
)

const getReviewers = (reviews, approval, removed) => (
  reviews.filter(r =>
    (r.status === approval ||
    !r.status && approval === ChangesetStatus.NOT_REVIEWED) &&
    removed.findIndex(u => u.id === r.user.id) === -1)
    .map(u => u.user)
)

class ReviewerList extends Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      reviewers: getReviewers(props.reviews, props.approval, []),
      removed: []
    }
  }

  componentWillMount()
  {
    this.setState(
      {
        reviewers: getReviewers(this.props.reviews, this.props.approval, this.state.removed),
      }
    )
  }

  componentWillReceiveProps(nextProps)
  {
    if (this.props === nextProps)
      return

    this.setState(
      {
        reviewers: getReviewers(nextProps.reviews, nextProps.approval, this.state.removed)
      }
    )
  }

  render()
  {
    const props = this.props
    const state = this.state

    const tooltipOverlay = <Tooltip id="tooltip">{props.tooltip}</Tooltip>
    return (state.reviewers.length > 0 &&
      <li>
      <span>
        <OverlayTrigger placement="left" overlay={tooltipOverlay}>
          <i
            style={{ marginRight: '12px', width: '12px', marginBottom: '6px' }}
            className={getClass(props.icon, props.approval)}
          />
        </OverlayTrigger>
        {state.reviewers.map((r, i) => {
          let reviewerClick = () => {
            this.setState({
              reviewers: getReviewers(this.props.reviews, this.props.approval, state.removed.concat(r)),
              removed: state.removed.concat(r),
            })

            props.removeReviewer(r)
          }

          return (<span><a onClick={reviewerClick}>{r.fullName || r.username}</a>{i + 1 < state.reviewers.length && ", "}</span>)
        })}
      </span>
      </li>
    )
  }
}

export default connect((state, props) => (
  {
    reviews: getReviews(state, props) || [],
  }
  ))(ReviewerList)
