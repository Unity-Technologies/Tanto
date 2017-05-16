/* @flow */
import moment from 'moment'
import React from 'react'
import Avatar from 'components/Avatar'
import { createSelector } from 'reselect'
import _ from 'lodash'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { connect } from 'react-redux'
import { pureComponent } from 'components/PureComponent'

export type HeaderPropsType = {
  id: string,
  title: string,
  created: string,
  owner: {
    fullName: string,
    username: string,
    slack: {
      avatar: string
    }
  }
}

export const getHeaderData = (state: Object, props: Object): HeaderPropsType =>
  createSelector(
    getPullRequest,
    (pr) =>
      _.pick(pr, ['title', 'created', 'owner']),
  )

const renderTitle = ({ title, owner, created }) => {
  if (!title || !owner || !created) {
    return null
  }

  return (
    <div>
      <Avatar avatar={owner.slack ? owner.slack.avatar : ''} />
      <div style={{ padding: '0 10px', display: 'table' }}>
        <div style={{ fontSize: '16px' }}>
          <strong>{title}</strong>
        </div>
        <span style={{ color: 'grey', fontSize: '13px' }}>
          created {moment(created).fromNow()}
          {' '} by {owner.fullName} ({owner.username})
        </span>
      </div>
    </div>
  )
}

const Header = (props: HeaderPropsType) => (
  <div style={{ display: 'inline-block', width: '100%' }}>
    {renderTitle(props)}
  </div >
)

export default connect(getHeaderData)(pureComponent(Header))
