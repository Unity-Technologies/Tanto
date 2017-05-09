/* @flow */

import { connect } from 'react-redux'
import React, { Component } from 'react'
import _ from 'lodash'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import { approvePullRequest } from 'ducks/comments/actions'
import type { UserType } from 'universal/types'
import { getLoggedUserId } from 'ducks/session/selectors'
import { getPullRequestNormalized } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

export type Props = {
  dispatch: Function,
  users: Array<UserType>,
  repoName: string,
  pullRequestId: string,
  status: {
    isCurrentUserPROwner: boolean,
    isCurrentUserApproved: boolean
  }
}

const btnStyle = {
  width: '135px',
}

const approveButtonStyle = {
  ...btnStyle,
  backgroundColor: '#1fb5ad',
  borderColor: '#1fb5ad',
  color: 'white',
}

export const getStatus = createSelector(
  getLoggedUserId, getPullRequestNormalized,
  (id, pr) => {
    if (!id || !pr) {
      return null
    }
    const isCurrentUserPROwner = id === pr.owner
    if (isCurrentUserPROwner) {
      return { isCurrentUserPROwner }
    }
    const approved = pr.reviews ?
      _.find(pr.reviews, review => (review.user === id && review.status === 'APPROVED')) : false
    return {
      isCurrentUserPROwner,
      isCurrentUserApproved: approved,
    }
  }
)


class ActionBar extends Component {
  props: Props

  handleApprovePullRequest = () => {
    this.props.dispatch(approvePullRequest({ name: this.props.repoName }, this.props.pullRequestId))
  }

  handleClosePullRequest = () => {
    // TODO: dispatch
  }

  render() {
    if (!this.props.status) {
      return null
    }
    const { status: { isCurrentUserPROwner, isCurrentUserApproved } } = this.props
    return (
      <div style={{ margin: '10px' }}>
        <ButtonGroup style={{ float: 'right', padding: '0 10px' }}>
          {!isCurrentUserPROwner &&
            <Button
              style={isCurrentUserApproved ? btnStyle : approveButtonStyle}
              onClick={this.handleApprovePullRequest}
              disabled={isCurrentUserApproved}
            >
              {isCurrentUserApproved ? 'Approved' : 'Approve'}
            </Button>
          }
          {isCurrentUserPROwner &&
            <Button style={{ ...btnStyle, width: '135px' }}>
              Close Pull Request
            </Button>
          }
          <DropdownButton
            pullRight
            style={{
              color: '#9E9E9E',
              width: '60px',
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
  status: getStatus(state, props),
}))(ActionBar)

