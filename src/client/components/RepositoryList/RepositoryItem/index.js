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
  repository: $Subtype<RepositoryType>,
}

export const RepositoryItem = ({ repository: { name, groupPath, description, updated, owner: { fullName } } }: Props) => (
  <ListGroupItem>
    <Row>
      <Col md={6} style={{ display: 'flex' }}>
        <div style={{ fontSize: '18px', color: 'rgb(81, 82, 83)' }}>
          <i className="fa fa-code-fork" />
        </div>
        <div style={{ display: 'table' }}>
          <div style={{ paddingLeft: '10px', display: 'table' }}>
            <Link
              to={buildProjectLink(name, groupPath)}
            >
              {name}
            </Link>
            <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
              {description}
            </div>
          </div>
        </div>
      </Col>
      <Col md={3}>
        {subHeader('Owner:')}
        <span>{fullName}</span>
      </Col>
      <Col md={3}>
        {subHeader('Last updated:')}
        <span>{fromNow(updated)}</span>
      </Col>
    </Row>
  </ListGroupItem>
  )

export default pureComponent(RepositoryItem)
