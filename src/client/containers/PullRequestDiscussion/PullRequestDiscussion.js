/* @flow */

import React, { Component } from 'react'
import { push } from 'react-router-redux'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import { connect } from 'react-redux'
import type { UserType } from 'universal/types'
import { ChangesetStatus } from 'universal/constants'
import type { StatusType } from 'ducks/fetch/selectors'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { createComment, updateComment, deleteComment, closePullRequest } from 'ducks/comments/actions'
import { updatePullRequestDescription, types } from 'ducks/pullrequests/actions'
import LoadingComponent from 'components/LoadingComponent'
import GeneralCommentThread from 'components/GeneralCommentThread'
import type { CommentType } from 'components/GeneralCommentThread'
import { getLoggedUser } from 'ducks/session/selectors'
import {
  getPullRequestGeneralComments,
  getPullRequestDescription,
} from 'ducks/pullrequests/selectors'

export type Props = {
  createComment: Function,
  editComment: Function,
  description: CommentType,
  pullRequestId: number,
  repoName: string,
  dispatch: Function,
  comments: Array<CommentType>,
  loggedUser: UserType,
  status: StatusType
}

export const getFetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_DISCUSSION)

class PullRequestDiscussion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }

  props: Props

  handleOnCommentUpdate = (id: string, text: string) =>
    this.props.dispatch(updateComment(id, text))

  handleClosePullRequest = () => {
    this.props.dispatch(closePullRequest({ name: this.props.repoName }, this.props.pullRequestId))
    this.props.dispatch(push('/'))
  }

  handleOnCommentCreate = (repoName: string, pullRequestId: string, text: string, status?: typeof ChangesetStatus, issue?: Object) =>
    this.props.dispatch(createComment({ name: repoName }, pullRequestId, text, status, issue))

  handleOnCommentDelete = (id: any) =>
    this.props.dispatch(deleteComment(id))

  handleOnDescriptionUpdate = (pullRequestId: any, text: string) =>
    this.props.dispatch(updatePullRequestDescription(pullRequestId, text))

  handleCloseModal = () => this.setState({ showModal: false })
  handleOpenModal = () => this.setState({ showModal: true })

  render() {
    if (!this.props.comments || !this.props.loggedUser) {
      return null
    }
    return (
      <div>
        <LoadingComponent status={this.props.status}>
          <GeneralCommentThread
            description={this.props.description}
            comments={this.props.comments}
            repoName={this.props.repoName}
            pullRequestId={this.props.pullRequestId}
            loggedUser={this.props.loggedUser}
            onDelete={this.handleOnCommentDelete}
            onUpdate={this.handleOnCommentUpdate}
            onSave={this.handleOnCommentCreate}
            onDescriptionUpdate={this.handleOnDescriptionUpdate}
            onPullRequestClose={this.handleOpenModal}
          />
        </LoadingComponent>
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


const mapStateToProps = (state: Object, props: Props): Props => ({
  ...props,
  description: getPullRequestDescription(state, props),
  comments: getPullRequestGeneralComments(state, props),
  status: getFetchStatus(state, props),
  loggedUser: getLoggedUser(state, props),
})

export default connect(mapStateToProps)(PullRequestDiscussion)
