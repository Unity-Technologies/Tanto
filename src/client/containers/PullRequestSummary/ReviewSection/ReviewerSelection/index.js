/* @flow */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import type { UserType } from 'universal/types'
import { default as Select } from 'components/VirtualizedSelect'
import MissingReviewerList from '../MissingReviewerList'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import './ReviewerSelection.css'

type MissingReviewerType = {
  area: string,
  reviewers: Array<UserType>,
}

type ReviewersProps = {
  id: string,
  reviewers: Set<string>,
  users: Array<UserType>,
  onToggleReviewer: (user: UserType) => void,
  addReviewers: (id: string, users: Array<UserType>) => void,
  missingReviewers: Array<MissingReviewerType>,
}

export const getMissingReviewers = createSelector(
  getPullRequest,
  (pr) => (pr && pr.missingReviewers ? pr.missingReviewers : [])
)

export type ValueType = {
  label: string,
  value: string,
  user: UserType,
}

class ReviewerSelection extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: ReviewersProps) {
    super(props)
    this.state = {
      value: [],
    }

    this.onChange = this.onChange.bind(this)
    this.addMissingReviewer = this.addMissingReviewer.bind(this)
  }

  props: ReviewersProps

  state: {
    value: []
  }

  onChange: Array<ValueType> => void

  onChange(value) {
    this.setState({
      value,
    })

    this.props.addReviewers(this.props.id, value.map(v => v.user))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.missingReviewers === this.props.missingReviewers) { return }

    this.setState({
      value: [],
    })
  }

  addMissingReviewer: (string, UserType) => void

  addMissingReviewer(id, reviewer) {
    const value = this.state.value
    if (value.findIndex(r => reviewer.username === r) === -1) {
      this.onChange(this.state.value.concat({
        label: reviewer.fullName || reviewer.username,
        value: reviewer.username,
        user: reviewer,
      }))
    }
  }

  render() {
    const options = this.props.users.map(u => ({
      label: u.fullName || u.username,
      value: u.username,
      user: u,
    }))

    return (
      <div>
        <Select
          name="test"
          value={this.state.value}
          onChange={this.onChange}
          options={options}
          multi
          ignoreAccents
          tabSelectsValue
          placeholder="Add reviewers..."
          className="reviewer-selection"
        />

        <MissingReviewerList
          id={this.props.id}
          missingReviewers={this.props.missingReviewers}
          addReviewer={this.addMissingReviewer}
        />

      </div>
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    missingReviewers: getMissingReviewers(state, props) || [],
  }
)

export default connect(mapStateToProps)(ReviewerSelection)
