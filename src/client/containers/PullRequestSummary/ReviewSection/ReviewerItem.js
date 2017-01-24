/* @flow */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import type { UserType } from 'universal/types'

export type ReviewerProps = {
  isReviewer: boolean,
  onToggleReviewer: (user: UserType) => void,
  user: UserType,
}

class ReviewerItem extends Component {
  onToggleReviewer = () => {
    this.props.onToggleReviewer(this.props.user)
  }

  props: ReviewerProps

  render() {
    const { isReviewer, user } = this.props

    return (
      <ListGroupItem
        onClick={this.onToggleReviewer}
        style={{
          padding: '2px 10px',
          textDecoration: 'none',
          outline: 'none',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <div
          style={{
            float: 'left',
            marginRight: '12px',
          }}
        >
          <i
            className="fa fa-check"
            style={{
              visibility: isReviewer ? 'inherit' : 'hidden',
              display: 'inline-block',
              fontSize: '16px',
              lineHeight: '40px',
              width: '40px',
              height: '40px',
              textAlign: 'center',
              verticalAlign: 'bottom',
            }}
          />
        </div>
        <div>
          <div style={{ fontSize: '14px' }}>
            <strong>{user.fullName}</strong>
          </div>
          <span style={{ color: 'grey', fontSize: '11px' }}>{user.username}</span>
        </div>
      </ListGroupItem>
    )
  }
}

export default ReviewerItem
