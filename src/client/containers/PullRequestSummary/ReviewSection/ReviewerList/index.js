/* @flow eslint-disable react/no-multi-comp */

import React from 'react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import './ReviewerList.css'
import { ChangesetStatus } from 'universal/constants'
import type { PullRequestReviewerType } from 'universal/types'

export type ReviewerListType = {
  reviewers: Array<PullRequestReviewerType>,
  icon: string,
  tooltip: string,
  approval: $Keys<typeof ChangesetStatus> // eslint-disable-line no-undef
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

const ReviewerList = (props: ReviewerListType) => {
  if (props.reviewers.length === 0) {
    return null
  }
  const tooltipOverlay = <Tooltip id="tooltip">{props.tooltip}</Tooltip>
  return (
    <li>
      <span>
        <OverlayTrigger placement="left" overlay={tooltipOverlay}>
          <i
            style={{ marginRight: '12px', width: '12px', marginBottom: '6px' }}
            className={getClass(props.icon, props.approval)}
          />
        </OverlayTrigger>
        {props.reviewers.map(r => r.user.fullName || r.user.username).join(', ')}
      </span>
    </li>
  )
}


export default ReviewerList
