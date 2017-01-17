/* @ flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import pureComponent from 'universal/react-pure-render'

const info = {
  borderLeft: '5px solid rgba(226, 231, 245, 0.62)',
}

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

const noTargetMessage =
  "This is just a range of changesets and doesn't have a target or a real merge ancestor."

type RepositoriesSectionProps = {
  origin: {
    url: string,
    label: string,
  },
  target: {
    url: string,
    label: string,
  }
}

export const RepositoriesSection = (props: RepositoriesSectionProps) =>
  <ListGroupItem style={info}>
    <Row>
      <Col md={5}>
        <div style={headerColumnStyle}>
          Repositories
        </div>
      </Col>
      <Col md={7}>
        <div>
          Origin: <a href={props.origin.url}>{props.origin.label}</a>
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


export default pureComponent(RepositoriesSection)
