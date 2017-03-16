/* @flow */

import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { types } from 'ducks/pullrequests/actions'
import type { GeneralCommentType, UserType, OriginGraphType } from 'universal/types'
import type { StatusType } from 'ducks/fetch/selectors'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { createComment, updateComment, deleteComment } from 'ducks/comments/actions'
import LoadingComponent from 'components/LoadingComponent'
import GeneralCommentThread from 'components/GeneralCommentThread'
import { getLoggedUser } from 'ducks/session/selectors'
import { getPullRequestNormalized, getPullRequestGeneralComments } from 'ducks/pullrequests/selectors'
// import { userEntitiesSelector } from 'ducks/users/selectors'


export type Props = {
  createComment: Function,
  editComment: Function,
  pullRequestId: number,
  pullRequest: {
    owner: UserType,
    description: string,
    created: string,
    origin: OriginGraphType,
  },
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

  render() {
    if (!this.props.pullRequest) {
      return null
    }
    return (
      <LoadingComponent status={this.props.status}>
        <GeneralCommentThread
          comments={this.props.comments}
          repoId={3}
          pullRequestId={this.props.pullRequestId}
          loggedUser={this.props.loggedUser}
          onDelete={this.handleOnCommentDelete}
          onUpdate={this.handleOnCommentUpdate}
          onSave={this.handleOnCommentCreate}
        />
      </LoadingComponent>
    )
  }
}


const mapStateToProps = (state: Object, props: Props): Props => ({
  ...props,
  pullRequest: getPullRequestNormalized(state, props),
  comments: getPullRequestGeneralComments(state, props),
  status: getFetchStatus(state, props),
  loggedUser: getLoggedUser(state, props),
})

export default connect(mapStateToProps)(PullRequestDiscussion)
