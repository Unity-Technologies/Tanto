/* @flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import moment from 'moment'
import Row from 'react-bootstrap/lib/Row'
import _ from 'lodash'
import { connect } from 'react-redux'
import { types } from 'ducks/pullrequests/actions'
import NewComment from 'components/NewComment/NewComment'
import TestAvatar from 'components/TestAvatar/TestAvatar'
import TextEditorBox from 'components/TextEditorBox/TextEditorBox'
import type { GeneralCommentType, UserType } from 'universal/types'
import type { StatusType } from 'ducks/fetch'
import { statusFetchCreator } from 'ducks/fetch'
import LoadingComponent from 'components/LoadingComponent'
import { getPullRequest } from 'ducks/pullrequests/selectors'
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
  user: string,
  status: StatusType
}

export const getFetchStatus = statusFetchCreator(types.FETCH_PULL_REQUEST_DISCUSSION)

export const getLoggedUser = (state: Object) => state.session.profile.fullName
export const getPullRequestDiscussion = (state: Object, props: Object): string =>
  createSelector(
    getPullRequest, getFetchStatus, getLoggedUser,
    (pr, status, user) => ({
      pullRequest: _.pick(pr, ['description', 'created', 'owner', 'comments']),
      status,
      user,
    })
  )

const renderHeadComment = ({ owner, description, created }) => {
  if (!owner || !created) {
    return null
  }
  const comment = {
    text: description,

  }
  return (
    <div>
      <div style={{ display: 'inline-flex', width: '100%' }}>
        <TestAvatar />
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: '14px', color: '#31708f' }}>
            <strong>{owner.fullName}</strong>
          </div>
          <div
            style={{
              color: 'rgb(145, 142, 142)',
              fontStyle: 'italic',
              textTransform: 'lowercase',
            }}
          >
            Initial PR description, 1 day ago
          </div>
        </div>
      </div>
      <TextEditorBox text={description || 'No description provided ...'} readOnly previewMode simpleText />
    </div>
  )
}

const renderComments = ({ comments }) => {
  if (!comments) {
    return null
  }
  return (
    <div>
      {comments.map(comment => (
        <div key={_.uniqueId('comment')}>
          <div style={{ display: 'inline-flex', width: '100%' }}>
            <TestAvatar />
            <div style={{ padding: '0 20px' }}>
              <div style={{ fontSize: '14px', color: '#31708f' }}>
                <strong>{comment.author.fullName}</strong>
              </div>
              <div
                style={{
                  color: 'rgb(145, 142, 142)',
                  fontStyle: 'italic',
                  textTransform: 'lowercase',
                }}
              >
                created {moment(comment.created).fromNow()}
              </div>
            </div>
          </div>
          <div style={{ marginRight: '10px' }}>
            <TextEditorBox text={comment.text} readOnly previewMode simpleText />
          </div>
          <hr style={{ margin: '15px 0' }} />
        </div>
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
            {renderHeadComment(props.pullRequest)}
          </Col>
        </Row>
        <hr style={{ margin: '15px 0' }} />
        <Row>
          <Col md={12}>
            {renderComments(props.pullRequest)}
            <div name="discussion-last" id="discussion-last" style={{ marginTop: '20px' }}>
              <NewComment
                author={props.user}
                headerStyle={{ borderRadius: '0px' }}
                style={{
                  borderBottom: '1px solid lightgrey',
                  borderRadius: '0px',
                  marginBottom: '10px',
                }}
                // ref="newTextEditorBox"
                placeholder="Write comment here..."
                onComment={props.onSaveComment}
              />
            </div>
          </Col>
        </Row>
      </div>
    </LoadingComponent>
  )
}


export default connect(getPullRequestDiscussion)(PullRequestDiscussion)

