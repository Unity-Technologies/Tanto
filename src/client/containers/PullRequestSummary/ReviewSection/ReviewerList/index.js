/* eslint-disable react/no-multi-comp */

import React from 'react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'

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
        {reviewers.map(r => r.user.fullName || r.user.username).join(', ')}
      </span>
    </li>
  )
}


export default ReviewerList
