/* @flow eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import './ReviewerList.css'
import type { PullRequestReviewerType } from 'universal/types'
import _ from 'lodash'

const getClass = (icon: string, color: string) => `fa ${icon} ${color}`

export type Props = {
  icon: string,
  tooltip: string,
  color: string,
  removeReviewer: Function,
  reviews: Array<PullRequestReviewerType>,
}

class ReviewerList extends Component {
  handleRemoveReviewer = (reviewerId: string) => {
    if (this.props.removeReviewer) {
      this.props.removeReviewer(reviewerId)
    }
  }

  render() {
    if (!this.props.reviews || !this.props.reviews.length) {
      return null
    }

    const tooltipOverlay = <Tooltip id="tooltip">{this.props.tooltip}</Tooltip>
    const icon = this.props.icon || 'fa-circle'

    return (
      <div>
        <li>
          <span>
            <OverlayTrigger placement="left" overlay={tooltipOverlay}>
              <i
                style={{ marginRight: '12px', width: '12px', marginBottom: '6px' }}
                className={getClass(icon, this.props.color)}
              />
            </OverlayTrigger>
            {this.props.reviews.map((r, i) => (
              <span key={_.uniqueId()}>
                <span className="reviewer-item" onClick={() => this.handleRemoveReviewer(r.user.id)}>
                  <a >
                    {r.user.fullName.trim() || r.user.username.trim()}
                  </a>
                  <i className="fa fa-times-circle reviewer-remove-icon" aria-hidden="true"></i>
                </span>
                {i + 1 < this.props.reviews.length && ', '}
              </span>
            ))}
          </span>
        </li>

      </div>
    )
  }
}

export default ReviewerList
