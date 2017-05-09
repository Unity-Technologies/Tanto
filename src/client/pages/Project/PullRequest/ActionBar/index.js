/* @flow */

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import React, { Component } from 'react'
import _ from 'lodash'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import { approvePullRequest, closePullRequest } from 'ducks/comments/actions'
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
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }

  state: {
    showModal: boolean
  }
  props: Props

  handleApprovePullRequest = () => {
    this.props.dispatch(approvePullRequest({ name: this.props.repoName }, this.props.pullRequestId))
  }

  handleClosePullRequest = () => {
    this.props.dispatch(closePullRequest({ name: this.props.repoName }, this.props.pullRequestId))
    this.props.dispatch(push('/'))
  }

  handleCloseModal = () => this.setState({ showModal: false })
  handleOpenModal = () => this.setState({ showModal: true })

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
            <Button style={{ ...btnStyle, width: '135px' }} onClick={this.handleOpenModal}>
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
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Close Pull Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This pull request will be closed and removed from your pull requests list. Click YES to proceed.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseModal}>Cancel</Button>
            <Button onClick={this.handleClosePullRequest} bsStyle="primary">Yes, close it.</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default connect((state, props) => ({
  status: getStatus(state, props),
}))(ActionBar)

