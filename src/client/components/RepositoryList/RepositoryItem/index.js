/* @flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { Link } from 'react-router'
import { fromNow } from 'utils/datetime'
import { buildProjectLink } from 'routes/helpers'
import { pureComponent } from 'components/PureComponent'

const subHeader = text => (
  <div className="sub-header">
    {text}
  </div>
)

export type RepositoryType = {
  name: string,
  description: ?string,
  groupPath: string,
  id: string,
  owner: { fullName: string },
  updated: string,
}

type Props = {
  clickHandler?: Function,
  repository: RepositoryType,
}

function RepositoryItem(props: Props) {
  const { repository } = props

  return (
    <ListGroupItem>
      <Row>
        <Col md={6} style={{ display: 'flex' }}>
          <div style={{ fontSize: '18px', color: 'rgb(81, 82, 83)' }}>
            <i className="fa fa-code-fork" aria-hidden="true"></i>
          </div>
          <div style={{ display: 'table' }}>
            <div style={{ paddingLeft: '10px', display: 'table' }}>
              <Link
                to={buildProjectLink(repository.name, repository.groupPath)}
              >
                {repository.name}
              </Link>
              <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                {repository.description}
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          {subHeader('Owner:')}
          <span>{repository.owner.fullName}</span>
        </Col>
        <Col md={3}>
          {subHeader('Last updated:')}
          <span>{fromNow(repository.updated)}</span>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export default pureComponent(RepositoryItem)
