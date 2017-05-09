/* @flow */
import React from 'react'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import { IssueStatus, IssueStatusText } from 'universal/constants'

import './IssueMenu.css'

const getStatusClass = (status?: string) => {
  switch (status) {
    case IssueStatus.FIX_LATER:
      return 'yellow'
    case IssueStatus.FIX_NEXT_PR:
      return 'orange'
    case IssueStatus.FIX_NOW:
      return 'red'
    default:
      return 'action-icon'
  }
}

const IssueIcon = ({ color }) => (
  <i className={`fa fa-bug action-icon ${color}`} aria-hidden="true" />
)

type Props = {
  issueStatus?: string,
  onStatusSelect: (issue: string) => void,
}

export const IssueMenu = (props: Props) => (
  <Dropdown id="dropdown-create-issue" pullRight>
    <Dropdown.Toggle className="action-button" noCaret>
      <IssueIcon color={getStatusClass(props.issueStatus)} />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <MenuItem eventKey="1" onClick={(e) => props.onStatusSelect(IssueStatus.FIX_NOW)}>
        <span><i className="fa fa-circle red" aria- hidden="true" ></i> {IssueStatusText.FIX_NOW}</span>
      </MenuItem>
      <MenuItem eventKey="2" onClick={(e) => props.onStatusSelect(IssueStatus.FIX_NEXT_PR)}>
        <span><i className="fa fa-circle orange" aria- hidden="true" ></i> {IssueStatusText.FIX_NEXT_PR}</span>
      </MenuItem>
      <MenuItem eventKey="3" onClick={(e) => props.onStatusSelect(IssueStatus.FIX_LATER)}>
        <span><i className="fa fa-circle yellow" aria- hidden="true" ></i> {IssueStatusText.FIX_LATER}</span>
      </MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4" onClick={(e) => props.onStatusSelect(IssueStatus.NONE)}>
        <span> Close issue</span>
      </MenuItem>
    </Dropdown.Menu>
  </Dropdown>
  )

export default IssueMenu
