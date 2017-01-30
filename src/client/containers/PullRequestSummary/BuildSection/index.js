/* @flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import pureComponent from 'universal/react-pure-render'

const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const success = {
  borderLeft: '5px solid rgb(214, 247, 229)',
}

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

const approvedColor = '#3f855b'

type BuildPropsType = {
  id: string,
  name: string,
  katanaLink: string,
  date: string,
  status: number,
}

const BuildSection = (props: BuildPropsType) =>
  <ListGroupItem style={success}>
    <Row>
      <Col md={2}>
        <div style={headerColumnStyle}>
          Katana build
        </div>
      </Col>
      <Col md={3}>
        {subHeader('Status:')}
        <div>
          <div style={{ color: approvedColor, textTransform: 'uppercase' }}>
            Passed
          </div>
          <div style={{ fontSize: '12px' }}>(5 hours ago)</div>
        </div>
      </Col>
      <Col md={6}>
        <div>
          <div>
            {subHeader('Latest:')}
            <a href="#">ABV-48147</a>
            <div style={{ fontSize: '12px' }}>(5 builds in total)</div>
          </div>
        </div>
      </Col>
      <Col md={1} />
    </Row>
  </ListGroupItem>


export default pureComponent(BuildSection)
