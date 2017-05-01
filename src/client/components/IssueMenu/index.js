/* @flow */
import React from 'react'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import { IssueStatus, IssueStatusText } from 'universal/constants'

import './IssueMenu.css'

const getStatusClass = (status: string) => {
  switch (status) {
    case IssueStatus.LATER:
    case IssueStatus.NEXT:
      return 'yellow'
    case IssueStatus.NOW:
      return 'red'
    default:
      return 'action-icon'
  }
}

const IssueIcon = ({ color }) => (
  <i className={`fa fa-bug ${color}`} aria-hidden="true" />
)

class IssueMenu extends React.Component {
  constructor(props: Object) {
    super(props)

    this.state = {
      issueStatus: IssueStatus.NONE,
    }
  }

  state: {
    issueStatus: string,
  }

  onCreateIssueAction = (action: string) => {
    this.setState({
      issueStatus: action,
    })
  }

  render() {
    return (<Dropdown id="dropdown-create-issue" pullRight>
      <Dropdown.Toggle className="action-button" noCaret>
        <IssueIcon color={getStatusClass(this.state.issueStatus)} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem eventKey="1" onClick={(e) => this.onCreateIssueAction(IssueStatus.NOW)}>{IssueStatusText.NOW}</MenuItem>
        <MenuItem eventKey="2" onClick={(e) => this.onCreateIssueAction(IssueStatus.NEXT)}>{IssueStatusText.NEXT}</MenuItem>
        <MenuItem eventKey="3" onClick={(e) => this.onCreateIssueAction(IssueStatus.LATER)}>{IssueStatusText.LATER}</MenuItem>
        <MenuItem divider />
        <MenuItem
          eventKey="4"
          onClick={(e) => this.onCreateIssueAction(IssueStatus.NONE)}
        >
          <IssueIcon color={getStatusClass(IssueStatus.NONE)} /> {IssueStatusText.NONE}
        </MenuItem>
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

export default IssueMenu
