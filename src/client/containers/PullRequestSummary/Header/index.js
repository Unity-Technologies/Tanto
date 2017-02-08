/* @flow */
import moment from 'moment'
import React from 'react'
import Avatar from 'components/Avatar'
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

const renderStub = () =>
  <div style={{ height: '40px', borderRadius: '5px', backgroundColor: '#f6f5f5' }} />

const renderTitle = ({ title, owner, created }) => {
  if (!title || !owner || !created) {
    return renderStub()
  }

  return (
    <div>
      <Avatar {...owner.slack} />
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

export default connect(getHeaderData)(Header)
