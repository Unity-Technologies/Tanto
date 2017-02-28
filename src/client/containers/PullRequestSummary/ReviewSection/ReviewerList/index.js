/* @flow eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import './ReviewerList.css'
import { ChangesetStatus } from 'universal/constants'
import type { PullRequestReviewerType } from 'universal/types'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { getPullRequest } from 'ducks/pullrequests/selectors'

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

const getApproval = (state, props) => props.approval

export const createGetReviewers = () => createSelector(
  [getReviews, getApproval],
  (reviews, approval) => (
    reviews.filter(
      r => r.status === approval || !r.status && approval === ChangesetStatus.NOT_REVIEWED)
  )
)

export type Props = {
  icon: string,
  tooltip: string,
  approval: $Keys<typeof ChangesetStatus>, // eslint-disable-line no-undef
  removeReviewer: Function,
  id: string,
  reviewers: Array<PullRequestReviewerType>,
}

export type RemovedType = {
  [key: number]: PullRequestReviewerType
}

class ReviewerList extends Component
{
  constructor(props: Props) {
    super(props)

    this.state = {
      removed: {},
    }
  }

  state: {
    removed: RemovedType
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      removed: {},
    })
  }

  render() {
    const tooltipOverlay = <Tooltip id="tooltip">{this.props.tooltip}</Tooltip>
    const displayReviewers = this.props.reviewers.filter(
      r => !this.state.removed.hasOwnProperty(r.user.id))

    return (
      <div>
        {displayReviewers.length > 0 &&
          <li>
            <span>
              <OverlayTrigger placement="left" overlay={tooltipOverlay}>
                <i
                  style={{ marginRight: '12px', width: '12px', marginBottom: '6px' }}
                  className={getClass(this.props.icon, this.props.approval)}
                />
              </OverlayTrigger>
              {displayReviewers.map((r, i) => {
                const reviewerClick = () => {
                  this.setState({
                    removed: {
                      ...this.state.removed,
                      [r.user.id]: r,
                    },
                  })

                  this.props.removeReviewer(r.user)
                }

                return (
                  <span>
                    <a onClick={reviewerClick}>
                      {r.user.fullName || r.user.username}
                    </a>{i + 1 < displayReviewers.length && ', '}
                  </span>
                )
              })}
            </span>
          </li>
        }
      </div>
    )
  }
}

const makeMapStateToProps = () => {
  const getReviewers = createGetReviewers()
  const mapStateToProps = (state, props) => ({
    reviewers: getReviewers(state, props),
  })
  return mapStateToProps
}

export default connect(makeMapStateToProps())(ReviewerList)
