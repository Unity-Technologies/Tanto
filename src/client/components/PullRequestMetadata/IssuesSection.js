/* @flow */
import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import IssueStatus from 'universal/constants'

import pureComponent from 'universal/react-pure-render'

const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const danger = {
  borderLeft: '5px solid rgb(255, 208, 208)',
}

const dangerColor = '#e96666'

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

type IssueStatusType = $Keys<typeof IssueStatus> // eslint-disable-line no-undef

type IssueType = {
  id: number,
  title: string,
  description: string,
  status: IssueStatusType
}

type IssuesSectionProps = {
  issues: Array<IssueType>
}

//  TODO: complete this component, now it's mockeed since no ono API available for it
export const IssuesSection = (props: IssuesSectionProps) =>
  <ListGroupItem style={danger}>
    <Row>
      <Col md={2}>
        <div style={headerColumnStyle}>
          PR Issues
        </div>
      </Col>
      <Col md={3}>
        {subHeader('Status:')}
        <div style={{ color: dangerColor, textTransform: 'uppercase' }}>
          UNRESOLVED
        </div>
        <div style={{ fontSize: '12px' }}>(12 issue)</div>
      </Col>
      <Col md={6}>
        <div>
          <div>
            {subHeader('Unresolved:')}
            <div><a href="#"># Rename to MdFourGenerator_Deprecated</a></div>
            <div><a href="#"># Template typename TValue, typename TNode</a></div>
          </div>
        </div>
      </Col>
      <Col md={1}>
        <div style={{ color: '#dbdedf', float: 'right', fontSize: '20px' }}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </div>
      </Col>
    </Row>
  </ListGroupItem>


export default pureComponent(IssuesSection)
