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
  user: string,
  status: StatusType
}

export const getFetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_DISCUSSION)

export const getLoggedUsername = (state: Object) => state.session.profile.fullName
export const getPullRequestDiscussion = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequest, getPullRequestGeneralComments, getFetchStatus, getLoggedUsername,
    (pr, comments, status, user) => ({
      pullRequest: {
        ..._.pick(pr, ['description', 'created', 'owner']),
        comments,
      },
      status,
      user,
    })
  )

const renderHeadComment = ({ owner, description, created }) => {
  if (!owner || !created) {
    return null
  }

  return (
    <div>
      <div style={{ display: 'inline-flex', width: '100%' }}>
        <Avatar {...owner.slack} />
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
      <TextEditorBox
        text={description || 'No description provided ...'}
        readOnly previewMode simpleText
      />
    </div>
  )
}

const renderComments = ({ comments }, user) => {
  if (!comments) {
    return null
  }
  return (
    <div>
      {comments.map(comment => (
        <Comment
          loggedUsername={user}
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
            {renderHeadComment(props.pullRequest)}
          </Col>
        </Row>
        <hr style={{ margin: '15px 0' }} />
        <Row>
          <Col md={12}>
            {renderComments(props.pullRequest, props.user)}
            <div name="discussion-last" id="discussion-last" style={{ marginTop: '20px' }}>
              <Comment
                comment={{
                  author: props.user,
                }}
                headerStyle={{ borderRadius: '0px' }}
                style={{
                  borderBottom: '1px solid lightgrey',
                  borderRadius: '0px',
                  marginBottom: '10px',
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
