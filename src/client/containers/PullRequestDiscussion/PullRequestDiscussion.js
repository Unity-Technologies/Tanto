/* @flow */

import React, { Component } from 'react'
import Comment from 'components/Comment'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import _ from 'lodash'
import { connect } from 'react-redux'
import { types, createPullRequestDiscussionCommentNormalizer } from 'ducks/pullrequests/actions'
import type { GeneralCommentType, UserType } from 'universal/types'
import type { StatusType } from 'ducks/fetch/selectors'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { fetchCommentEdit, fetchCommentCreate } from 'ducks/comments/actions'
import LoadingComponent from 'components/LoadingComponent'
import { getLoggedUser } from 'ducks/session/selectors'
import { getPullRequestGeneralComments, getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

export type Props = {
  onSaveComment?: Function,
  onCommentEdit: Function,
  pullRequestId: number,
  pullRequest: {
    owner: UserType,
    description: string,
    created: string,
    comments: Array<GeneralCommentType>,
  },
  user: UserType,
  status: StatusType
}

export const getFetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_DISCUSSION)


const renderHeadComment = ({ owner, description, created }, loggedUsername) => {
  if (!owner || !created) {
    return null
  }
  const comment = {
    author: owner,
    text: description,
    created,
  }
  return (
    <Comment
      loggedUsername={loggedUsername}
      comment={comment}
      onoStyle
    />
  )
}

class PullRequestDiscussion extends Component {
  constructor(props: Props) {
    super(props)

    this.onCommentEdit = this.onCommentEdit.bind(this)
    this.onCommentCreation = this.onCommentCreation.bind(this)
  }

  props: Props

  onCommentEdit(commentId: number, text: string) : void {
    this.props.editComment(commentId, text)
  }

  onCommentCreation(commentId: Any, text: string) : void {
    this.props.createComment({
      repoId: this.props.pullRequest.origin.repository.id,
      text,
      pullRequestId: this.props.pullRequestId,
    }, this.props.pullRequestId)
  }

  renderComments({ comments }, loggedUsername, onCommentSave) {
    if (!comments) {
      return null
    }
    return (
      <div>
        {comments.map(comment => (
          <Comment
            key={comment.id.toString()}
            loggedUsername={loggedUsername}
            onoStyle
            simpleText
            onCommentSave={this.onCommentEdit}
            comment={comment}
          />
         ))}
      </div>
    )
  }

  render() {
    if (!this.props.pullRequest) {
      return null
    }
    return (
      <LoadingComponent status={this.props.status}>
        <div>
          <Row>
            <Col md={12}>
              {renderHeadComment(this.props.pullRequest, this.props.user.username)}
            </Col>
          </Row>
          <hr style={{ margin: '15px 0' }} />
          <Row>
            <Col md={12}>
              {this.renderComments(this.props.pullRequest, this.props.user.username)}
              <div name="discussion-last" id="discussion-last" style={{ marginTop: '20px' }}>
                <Comment
                  comment={{
                    author: this.props.user,
                  }}
                  newComment
                  onCommentSave={this.onCommentCreation}
                />
              </div>
            </Col>
          </Row>
        </div>
      </LoadingComponent>
    )
  }
}

export const getPRequest = createSelector(
  getPullRequest, getPullRequestGeneralComments,
  (pr, comments) => {
    console.log(comments)
    return {
      ..._.pick(pr, ['description', 'created', 'owner', 'origin']),
      comments,
    }
  }
)

const mapStateToProps = (state, props) => ({
  ...props,
  pullRequest: getPRequest(state, props),
  status: getFetchStatus(state, props),
  user: getLoggedUser(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  editComment: (commentId, text) => dispatch(
    fetchCommentEdit(commentId, text)),
  createComment: (commentInput, pullRequestId) => dispatch(
    fetchCommentCreate(commentInput,
                       createPullRequestDiscussionCommentNormalizer(pullRequestId))
  ),
})

/* flow-disable */
export default connect(mapStateToProps, mapDispatchToProps)(PullRequestDiscussion)
