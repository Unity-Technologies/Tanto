/* @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import type { UserType } from 'universal/types'
import { ChangesetStatus } from 'universal/constants'
import type { StatusType } from 'ducks/fetch/selectors'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { createComment, updateComment, deleteComment } from 'ducks/comments/actions'
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

  props: Props

  handleOnCommentUpdate = (id: string, text: string) =>
    this.props.dispatch(updateComment(id, text))

  handleOnCommentCreate = (repoName: string, pullRequestId: string, text: string, status?: typeof ChangesetStatus, issue?: string) =>
    this.props.dispatch(createComment({ name: repoName }, pullRequestId, text, status, issue))

  handleOnCommentDelete = (id: any) =>
    this.props.dispatch(deleteComment(id))

  handleOnDescriptionUpdate = (pullRequestId: any, text: string) =>
    this.props.dispatch(updatePullRequestDescription(pullRequestId, text))

  render() {
    if (!this.props.comments || !this.props.loggedUser) {
      return null
    }
    return (
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
        />
      </LoadingComponent>
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
