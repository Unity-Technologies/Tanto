/* @flow */

import React from 'react'
import Comment from 'components/Comment'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import _ from 'lodash'
import { connect } from 'react-redux'
import { types } from 'ducks/pullrequests/actions'
import Avatar from 'components/Avatar'
import TextEditorBox from 'components/TextEditorBox'
import type { GeneralCommentType, UserType } from 'universal/types'
import type { StatusType } from 'ducks/fetch/selectors'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import LoadingComponent from 'components/LoadingComponent'
import { getLoggedUser } from 'ducks/session/selectors'
import { getPullRequestGeneralComments, getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

export type Props = {
  onSaveComment?: Function,
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

export const getPullRequestDiscussion = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequest, getPullRequestGeneralComments, getFetchStatus, getLoggedUser,
    (pr, comments, status, user, loggedUsername) => ({
      pullRequest: {
        ..._.pick(pr, ['description', 'created', 'owner']),
        comments,
      },
      status,
      user,
    })
  )

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

const renderComments = ({ comments }, loggedUsername) => {
  if (!comments) {
    return null
  }
  return (
    <div>
      {comments.map(comment => (
        <Comment
          loggedUsername={loggedUsername}
          onoStyle
          simpleText
          comment={comment}
        />
      ))}
    </div>
  )
}

const PullRequestDiscussion = (props: Props) => {
  if (!props.pullRequest) {
    return null
  }
  return (
    <LoadingComponent status={props.status}>
      <div>
        <Row>
          <Col md={12}>
            {renderHeadComment(props.pullRequest, props.user.username)}
          </Col>
        </Row>
        <hr style={{ margin: '15px 0' }} />
        <Row>
          <Col md={12}>
            {renderComments(props.pullRequest, props.user.username)}
            <div name="discussion-last" id="discussion-last" style={{ marginTop: '20px' }}>
              <Comment
                comment={{
                  author: props.user,
                }}
                newComment
                onComment={props.onSaveComment}
              />
            </div>
          </Col>
        </Row>
      </div>
    </LoadingComponent>
  )
}

/* flow-disable */
export default connect(getPullRequestDiscussion)(PullRequestDiscussion)
