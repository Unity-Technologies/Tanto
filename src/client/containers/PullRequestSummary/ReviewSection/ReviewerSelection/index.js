/* @flow */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import type { UserType } from 'universal/types'
import Select from 'react-select'
import { Button } from 'react-bootstrap'


type ReviewersProps = {
  id: Int,
  reviewers: Set<string>,
  users: Array<UserType>,
  onToggleReviewer: (user: UserType) => void,
  addReviewers: (users: Array<UserType>) => void,
}


class ReviewerSelection extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: ReviewersProps) {
    super(props)
    this.state = {
      value: []
    }
  }

  props: ReviewersProps

  state: {
    value: []
  }

  saveReviewers() {
    this.props.addReviewers(this.props.id, this.state.value.map(v => ({id:v.user.id})))
  }

  render() {
    let options = this.props.users.map(u => ({
      label: u.fullName || u.username,
      value: u.username,
      user: u
    }))

    return (
      <div>
        <Row>
          <Col md={10}>
            <Select
              name="test"
              value={this.state.value}
              onChange={value => this.setState({value})}
              options={options}
              multi
              ignoreAccents
              tabSelectsValue
              placeholder='Add reviewers...'
            />
          </Col>
          <Col md={2}>
            {this.state.value.length > 0 && <div>
              <Button onClick={this.saveReviewers.bind(this)}>Save</Button>
            </div>}
          </Col>
        </Row>
      </div>
    )
  }
}

export default ReviewerSelection
