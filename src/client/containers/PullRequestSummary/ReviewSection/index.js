/* @flow */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import fuzzy from 'fuzzy'
import { connect } from 'react-redux'
import ReviewerItem from './ReviewerItem'
import type { UserType, ReviewType } from 'universal/types'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector, createStructuredSelector } from 'reselect'

const whiteSpaceRegExp = /\s+/g

type ReviewProps = {
  id: string,
  reviews: Set<ReviewType>,
  users: Array<UserType>,
  onToggleReviewer: (user: UserType) => void,
}

export const getReviewsData = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequest,
    (pr) => pr.reviewers
  )

export const getUsersData = (state: Object): Array<UserType> => state.users

export const getData = createStructuredSelector({
  reviews: getReviewsData,
  users: getUsersData,
})

class ReviewSection extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: ReviewProps) {
    super(props)
    this.state = {
      usersAfterSearch: this.props.users,
      query: '',
    }
  }

  props: ReviewProps

  state: {
    usersAfterSearch: Array<UserType>,
    query: string,
  }

  onSearchQueryChange = (event: SyntheticInputEvent) => {
    const query = event.target.value
    let usersAfterSearch = []

    if (query) {
      const queryWithoutWhitespace = query.replace(whiteSpaceRegExp, '')
      const matches = fuzzy.filter(queryWithoutWhitespace, this.props.users, {
        // A bit quick and dirty to concat these, but does the job:
        extract: (el) => `${el.username} ${el.fullName}`,
      })
      usersAfterSearch = matches ? matches.map(match => match.original) : []
    } else {
      usersAfterSearch = this.props.users
    }

    this.setState({
      usersAfterSearch,
      query,
    })
  }

  render() {
    const { onToggleReviewer, reviewers } = this.props
    const { usersAfterSearch } = this.state

    return (
      <div>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: 'inline-flex',
                border: '1px solid lightgrey',
                borderRadius: '5px',
                padding: '7px',
                width: '100%',
              }}
            >
              <span style={{ pagging: '10px', color: 'grey' }}>
                <i className="fa fa-search" aria-hidden="true" />
              </span>
              <input
                type="text"
                style={{
                  outline: 'none',
                  border: 'none',
                  marginLeft: '10px',
                  fontSize: '14px',
                  width: '100%',
                }}
                onChange={this.onSearchQueryChange}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <ListGroup
              style={{
                fontSize: '13px',
                maxHeight: '500px',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              {usersAfterSearch && usersAfterSearch.map(user => (
                <ReviewerItem
                  user={user}
                  isReviewer={reviewers.has(user.username)}
                  onToggleReviewer={onToggleReviewer}
                  key={user.username}
                />
            ))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(getData)(ReviewSection)
