/* eslint-disable */
import React, { PropTypes, Component } from 'react'
import { TestAvatar } from 'components'
import { Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap'
import _ from 'lodash'
import './IssuesList.css'


const subHeader = text => (
  <div
    style={{ color: '#8c8c8c', fontSize: '13px' }}
  >
    {text}
  </div>
)

export type Props = { issues?: any };

class IssuesList extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { search: null }
  }

  props: Props;

  render() {
    const greenStatus = { borderLeft: '4px solid #d1fad1' }
    const yellowStatus = { borderLeft: '4px solid #ffcbad' }
    const greyStatus = { borderLeft: '4px solid lightgrey' }
    return (
      <div>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: 'inline-flex',
                border: '1px solid lightgrey',
                borderRadius: '5px',
                padding: '7px',
                width: '100%' }}
            >
              <span
                style={{ pagging: '10px', color: 'grey' }}
              >
                <i className="fa fa-search" aria-hidden="true" />
              </span>
              <input
                type="text"
                style={{
                  outline: 'none',
                  border: 'none',
                  marginLeft: '10px',
                  fontSize: '14px',
                  width: '100%' }}
              />
              <i className="fa fa-sort-amount-asc" style={{ color: 'lightgrey', margin: '1px 10px', fontSize: '16px' }} aria-hidden="true" />
            </div>
            <div
              style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }}
            >
              5 open issues, 3 unresolved, 2 can be fixed later
            </div>

          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <ListGroup style={{ fontSize: '13px', maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}>
              {this.props.issues.map(issue => (
                <ListGroupItem
                  key={_.uniqueId('listItem')}
                  style={{ padding: '10px 10px',
                 ...(issue.status === 1 ? greenStatus :
                      (issue.status === 2 ? yellowStatus : greyStatus)) }}
                >
                  <Row>
                    <Col md={6} sm={6} xs={12}>
                      <div style={{ display: 'table' }}>
                        <TestAvatar />
                        <div style={{ paddingLeft: '10px', display: 'table' }}>
                          <a href="#issue">{issue.title}</a>
                          <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                            <span>file</span>
                            <a style={{ color: '#5a6082' }} href="#file">{issue.file}</a>, line {issue.line}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={3} smHidden xsHidden>
                      {subHeader('Age:')}
                      {issue.age}
                    </Col>
                    <Col md={3} sm={6} xsHidden>
                      {subHeader('Assigned to:')}
                      {issue.assignedto}
                    </Col>
                  </Row>
                </ListGroupItem>))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default IssuesList
