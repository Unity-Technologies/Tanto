/* @flow */
import React from 'react'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import { IssueStatus, IssueStatusText } from 'universal/constants'
import RemoveIcon from 'components/Icon/RemoveIcon'

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

type Props = {
  onCreateIssueAction?: (issue: string) => void,
}

class IssueMenu extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      issueStatus: IssueStatus.NONE,
    }
  }

  state: {
    issueStatus: string,
  }

  handleCreateIssueAction = (issue: string) => {
    this.setState({
      issueStatus: issue,
    })
    if (this.props.onCreateIssueAction) {
      this.props.onCreateIssueAction(issue)
    }
  }

  render() {
    return (<Dropdown id="dropdown-create-issue" pullRight>
      <Dropdown.Toggle className="action-button" noCaret>
        <IssueIcon color={getStatusClass(this.state.issueStatus)} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem eventKey="1" onClick={(e) => this.handleCreateIssueAction(IssueStatus.NOW)}>{IssueStatusText.NOW}</MenuItem>
        <MenuItem eventKey="2" onClick={(e) => this.handleCreateIssueAction(IssueStatus.NEXT)}>{IssueStatusText.NEXT}</MenuItem>
        <MenuItem eventKey="3" onClick={(e) => this.handleCreateIssueAction(IssueStatus.LATER)}>{IssueStatusText.LATER}</MenuItem>
        <MenuItem divider />
        <MenuItem
          eventKey="4"
          onClick={(e) => this.handleCreateIssueAction(IssueStatus.NONE)}
        >
          <RemoveIcon /> {IssueStatusText.NONE}
        </MenuItem>
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

export default IssueMenu
