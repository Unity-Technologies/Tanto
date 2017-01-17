/* @flow */
import moment from 'moment'
import React from 'react'
import UserAvatar from 'components/UserAvatar'
import pureComponent from 'universal/react-pure-render'

export type HeaderProps = {
  title: string,
  created: string,
  owner: {
    fullName: string,
    username: string
  }
}

const Header = (props: HeaderProps) =>
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
        {' '} by {props.owner.fullName} ({props.owner.username})
      </span>
    </div>
  </div>


export default pureComponent(Header)
