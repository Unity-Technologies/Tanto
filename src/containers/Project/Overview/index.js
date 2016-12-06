/* @flow */

import React from 'react'
import Helmet from 'react-helmet'
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { prDescription } from '../../../api/testData'

export type Props = {
  params: {
    id: string,
  }
}

function Overview({ params: { id } }: Props) {
  return (
    <div>
      <Helmet title={`Project ${id}`} />
      <div style={{ fontSize: '14px' }}>
        <Row>
          <Col md={8}>
            <h3>Project readme</h3>
            <p>{prDescription}</p>
            <h3>Project release notes</h3>
            <ul>
              <li> Release note 1 </li>
              <li> Release note 2 </li>
              <li> Release note 3 </li>
            </ul>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroupItem>Owner: <strong>John doe</strong></ListGroupItem>
              <ListGroupItem>Followers: <strong>12</strong></ListGroupItem>
              <ListGroupItem>Branches: <strong>120</strong></ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Overview
