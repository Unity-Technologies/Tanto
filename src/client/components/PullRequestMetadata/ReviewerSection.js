/* @flow */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import fuzzy from 'fuzzy'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import pureComponent from 'universal/react-pure-render'

type UserType = {
  fullName: string,
  username: string,
}

type ReviewerSelectionItemProps = {
  isReviewer: boolean,
  onToggleReviewer: (user: UserType) => void,
  user: UserType,
}

const whiteSpaceRegExp = /\s+/g

class ReviewerSelectionItem extends Component {

  onToggleReviewer = () => {
    this.props.onToggleReviewer(this.props.user)
  }

  props: ReviewerSelectionItemProps

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


type ReviewersProps = {
  reviewers: Set<string>,
  users: Array<UserType>,
  onToggleReviewer: (user: UserType) => void,
}


class ReviewerSelection extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: ReviewersProps) {
    super(props)
    this.state = {
      usersAfterSearch: this.props.users,
      query: '',
    }
  }

  props: ReviewersProps

  state: {
    usersAfterSearch: Array<UserType>,
    query: string,
  }

  onSearchQueryChange = (event: SyntheticInputEvent) => {
    const query = event.target.value
    let usersAfterSearch

    if (query) {
      const queryWithoutWhitespace = query.replace(whiteSpaceRegExp, '')
      const matches = fuzzy.filter(queryWithoutWhitespace, this.props.users, {
        // A bit quick and dirty to concat these, but does the job:
        extract: (el) => `${el.username} ${el.fullName}`,
      })
      usersAfterSearch = matches.map(match => match.original)
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
              {usersAfterSearch.map(user => (
                <ReviewerSelectionItem
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

export default ReviewerSelection
