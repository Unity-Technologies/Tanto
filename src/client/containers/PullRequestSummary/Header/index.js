/* @flow */
import moment from 'moment'
import React from 'react'
import UserAvatar from 'components/UserAvatar'
import { createSelector } from 'reselect'
import _ from 'lodash'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { connect } from 'react-redux'

export type HeaderPropsType = {
  id: string,
  title: string,
  created: string,
  owner: {
    fullName: string,
    username: string
  }
}

export const getHeaderData = (state: Object, props: Object): HeaderPropsType => createSelector(
  getPullRequest,
  (pr) =>
    _.pick(pr, ['title', 'created', 'owner']),
)

const Header = (props: HeaderPropsType) =>
  <div style={{ display: 'inline-block' }}>
    <UserAvatar
      src={null}  // FIXME
      style={{ float: 'left', display: 'table-column' }}
    />
    <div style={{ padding: '0 10px', display: 'table' }}>
      <div style={{ fontSize: '16px' }}>
        <strong>{props.title}</strong>
      </div>
      <span style={{ color: 'grey', fontSize: '13px' }}>
        created {moment(props.created).fromNow()}
        {' '} by {props.owner ? props.owner.fullName : ''} ({props.owner ? props.owner.username : ''})
      </span>
    </div>
  </div>

export default connect(getHeaderData)(Header)
