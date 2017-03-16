/* @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { types } from 'ducks/pullrequests/actions'
import type { GeneralCommentType, UserType } from 'universal/types'
import type { StatusType } from 'ducks/fetch/selectors'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { createComment, updateComment, deleteComment } from 'ducks/comments/actions'
import { updatePullRequestDescription } from 'ducks/pullrequests/actions'
import LoadingComponent from 'components/LoadingComponent'
import GeneralCommentThread from 'components/GeneralCommentThread'
import type { PullRequestDescriptionType } from 'components/GeneralCommentThread'
import { getLoggedUser } from 'ducks/session/selectors'
import {
  getPullRequestGeneralComments,
  getPullRequestDescription,
  getPullRequestRepoId,
} from 'ducks/pullrequests/selectors'

export type Props = {
  createComment: Function,
  editComment: Function,
  description: PullRequestDescriptionType,
  pullRequestId: number,
  repoId: string,
  comments: Array<GeneralCommentType>,
  loggedUser: UserType,
  status: StatusType
}

export const getFetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_DISCUSSION)

class PullRequestDiscussion extends Component {

  props: Props

  handleOnCommentUpdate = (id: string, text: string): void => {
    this.props.dispatch(updateComment(id, text))
  }

  handleOnCommentCreate = (repoId: string, pullRequestId: string, text: string): void => {
    this.props.dispatch(createComment(repoId, pullRequestId, text))
  }

  handleOnCommentDelete = (id: any): void => {
    this.props.dispatch(deleteComment(id))
  }

  handleOnDescriptionUpdate = (pullRequestId: any, text: string): void => {
    this.props.dispatch(updatePullRequestDescription(pullRequestId, text))
  }

  render() {
    if (!this.props.comments || !this.props.loggedUser) {
      return null
    }
    return (
      <LoadingComponent status={this.props.status}>
        <GeneralCommentThread
          description={this.props.description}
          comments={this.props.comments}
          repoId={this.props.repoId}
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
  repoId: getPullRequestRepoId(state, props),
  comments: getPullRequestGeneralComments(state, props),
  status: getFetchStatus(state, props),
  loggedUser: getLoggedUser(state, props),
})

export default connect(mapStateToProps)(PullRequestDiscussion)
