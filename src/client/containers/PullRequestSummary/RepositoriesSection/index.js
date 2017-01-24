/* @ flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { connect } from 'react-redux'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import _ from 'lodash'
import { createSelector } from 'reselect'

const info = {
  borderLeft: '5px solid rgba(226, 231, 245, 0.62)',
}

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

const noTargetMessage =
  "This is just a range of changesets and doesn't have a target or a real merge ancestor."

export type RepositoriesPropsType = {
  id: string,
  origin: {
    url: string,
    label: string,
  },
  target: {
    url: string,
    label: string,
  }
}

export const getRepositoriesData = (state: Object, props: Object): RepositoriesPropsType =>
  createSelector(
    getPullRequest,
    (pr) => _.pick('origin', 'target')
  )

export const RepositoriesSection = (props: RepositoriesPropsType) =>
  <ListGroupItem style={info}>
    <Row>
      <Col md={5}>
        <div style={headerColumnStyle}>
          Repositories
        </div>
      </Col>
      <Col md={7}>
        <div>
          Origin: <a href={props.origin ? props.origin.url : ''}>{props.origin ? props.origin.label : ''}</a>
          <br />
          {/* NOTE: target is absent if PR created from created from changeset*/}
          {props.target}
          Target: {props.target ?
            <a href={props.target.url}>{props.target.label}</a> :
            noTargetMessage}
        </div>
      </Col>
    </Row>
  </ListGroupItem>

export default connect(getRepositoriesData)(RepositoriesSection)

