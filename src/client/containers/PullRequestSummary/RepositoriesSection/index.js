/* @ flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { connect } from 'react-redux'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import _ from 'lodash'
import { createSelector } from 'reselect'
import { buildReposLink } from 'routes/helpers'
import { Link } from 'react-router-dom'

const info = {
  borderLeft: '5px solid rgba(226, 231, 245, 0.62)',
}

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

const noTargetMessage =
  "This is just a range of changesets and doesn't have a target or a real merge ancestor."

type OriginType = {
  name: string,
  repository: {
    name: string,
  }
}

type TargetType = {
  repository: {
    name: string
  }
}


export type RepositoriesPropsType = {
  id: string,
  origin: OriginType,
  target: TargetType
}

export const getRepositoriesData = (state: Object, props: Object): RepositoriesPropsType =>
  createSelector(
    getPullRequest,
    (pr) => _.pick(pr, ['origin', 'target'])
  )

export const OriginLink = (props: OriginType) =>
  <div>Origin:
    {!props.origin && <span> undefined...</span>}
    {props.origin &&
      <Link
        style={{ textDecoration: 'none', color: 'rgb(59, 120, 155)' }}
        to={{
          pathname: buildReposLink(props.origin.repository.name),
          query: { branch: props.origin.name },
        }}
      >
        <span> {props.origin.repository.name}</span>
        <span style={{ color: '#8ea7b6' }}>#</span>{props.origin.name}
      </Link>
    }
  </div >

export const TargetLink = (props: TargetType) =>
  <div> Target:
  {!props.target && <span> {noTargetMessage}</span>}
  {props.target &&
    <Link
      style={{ textDecoration: 'none', color: 'rgb(59, 120, 155)' }}
      to={buildReposLink(props.target.repository.name)}
    >
      <span> {props.target.repository.name}</span>
    </Link>
  }
  </div>


export const RepositoriesSection = (props: RepositoriesPropsType) =>
  <ListGroupItem style={info}>
    <Row>
      <Col md={5}>
        <div style={headerColumnStyle}>
          Repositories
        </div>
      </Col>
      <Col md={7}>
        <OriginLink origin={props.origin} />
        <TargetLink target={props.target} />
      </Col>
    </Row>
  </ListGroupItem>

export default connect(getRepositoriesData)(RepositoriesSection)

