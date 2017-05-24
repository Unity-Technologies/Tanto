/* @flow */
import React from 'react'

import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import { ChangesetStatus } from 'universal/constants'

import './PullRequestVoteMenu.css'

const VoteStatus = ({ status, showTitle, title }: Object) => {
  if (showTitle && status === ChangesetStatus.NONE) {
    return <span>{title}</span>
  }
  switch (status) {
    case ChangesetStatus.APPROVED:
      return <span><i className="fa fa-circle approved" /> Approved</span>
    case ChangesetStatus.REJECTED:
      return <span><i className="fa fa-circle rejected" /> Request changes</span>
    case ChangesetStatus.NONE:
    default:
      return <span> <i className="fa fa-times" /> Clear vote</span>
  }
}

type Props = {
  reviewStatus?: String,
  onStatusSelect: (action: string) => void,
}

export const PullRequestVoteMenu = ({ reviewStatus, onStatusSelect }: Props) => (
  <Dropdown id="dropdown-create-issue" pullRight>
    <Dropdown.Toggle className="action-button" noCaret>
      <VoteStatus status={reviewStatus} title={'Vote for pull request'} showTitle />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <MenuItem eventKey={1} onClick={() => onStatusSelect(ChangesetStatus.APPROVED)}>
        <VoteStatus status={ChangesetStatus.APPROVED} /></MenuItem>
      <MenuItem eventKey={2} onClick={() => onStatusSelect(ChangesetStatus.REJECTED)}>
        <VoteStatus status={ChangesetStatus.REJECTED} /></MenuItem>
      <MenuItem eventKey={3} onClick={() => onStatusSelect(ChangesetStatus.NONE)}>
        <VoteStatus status={ChangesetStatus.NONE} />
      </MenuItem>
    </Dropdown.Menu>
  </Dropdown>
)

PullRequestVoteMenu.defaultProps = {
  reviewStatus: null,
}

export default PullRequestVoteMenu
