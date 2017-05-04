/* @flow */

import { connect } from 'react-redux'
import React, { Component } from 'react'
import { getUsers } from 'ducks/users/selectors'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import type { UserType } from 'universal/types'

export type Props = {
  dispatch: Function,
  users: Array<UserType>,
  pullRequestId: string
}

const btnStyle = {
  width: '110px',
}

const approveButtonStyle = {
  ...btnStyle,
  backgroundColor: '#1fb5ad',
  borderColor: '#1fb5ad',
  color: 'white',
}

class ActionBar extends Component {
  props: Props

  handleApprovePullRequest = () => {
    // TODO: dispatch
  }

  handleClosePullRequest = () => {
  // TODO: dispatch
  }

  render() {
    return (
      <div style={{ margin: '10px' }}>
        <ButtonGroup style={{ float: 'right' }}>
          <Button style={approveButtonStyle} onClick={this.handleApprovePullRequest}>
            Approve
          </Button>
          <Button style={btnStyle}>
            Close
          </Button>
          <DropdownButton
            pullRight
            style={{
              color: '#9E9E9E',
            }}
            title={<i className="fa fa-cog" aria-hidden="true" />}
            id="dropdown-button-pull-request-actions"
          >
            <MenuItem eventKey="1">Change owner</MenuItem>
          </DropdownButton>
        </ButtonGroup>

      </div>
    )
  }
}

export default connect((state, props) => ({
  users: getUsers(state, props),
}))(ActionBar)

