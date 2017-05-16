/* @flow */

/* eslint no-param-reassign: ["error", { "props": false }] */

import React from 'react'
import PureComponent from 'components/PureComponent'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import type { IssueType } from 'universal/types'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import { IssueStatus, IssueStatusText } from 'universal/constants'
import moment from 'moment'

import _ from 'lodash'

import Avatar from 'components/Avatar'
import './IssuesList.css'

const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const greenStatus = { borderLeft: '4px solid #d1fad1' }
const redStatus = { borderLeft: '4px solid #F44336' }
const yellowStatus = { borderLeft: '4px solid #ffcbad' }
const greyStatus = { borderLeft: '4px solid lightgrey' }

export type Props = {
  issues: Array<IssueType>,
}

type statusCountType = {
  [key: string]: number,
}

type IssueStatusType = {
  text: string,
  color: Object,
}

const getStatus = (status: string): IssueStatusType => {
  switch (status) {
    case IssueStatus.LATER:
      return {
        text: IssueStatusText.FIX_LATER,
        color: yellowStatus,
      }
    case IssueStatus.NEXT:
      return {
        text: IssueStatusText.FIX_NEXT_PR,
        color: yellowStatus,
      }
    case IssueStatus.NOW:
      return {
        text: IssueStatusText.FIX_NOW,
        color: redStatus,
      }
    case IssueStatus.FIX_AVAILABLE:
      return {
        text: IssueStatusText.FIX_AVAILABLE,
        color: greenStatus,
      }
    case IssueStatus.FIX_CONFIRMED:
      return {
        text: IssueStatusText.FIX_CONFIRMED,
        color: greenStatus,
      }
    case IssueStatus.OBSOLETE:
      return {
        text: IssueStatusText.OBSOLETE,
        color: greenStatus,
      }
    default:
      return {
        text: 'Unknown issue status',
        color: greyStatus,
      }
  }
}

const calculateStatuses = (issues: Array<IssueType>): statusCountType => issues.reduce(
  (statuses, issue) => {
    if (issue.status in statuses) {
      statuses[issue.status]++
    } else {
      statuses[issue.status] = 1
    }
    return statuses
  },
  {},
)

class IssuesList extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = { search: null }
  }

  state: {
    search: ?string,
  }

  props: Props

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return nextProps.issues && nextProps.issues.length &&
      super.shouldComponentUpdate(nextProps, nextState)
  }

  render() {
    const statuses = calculateStatuses(this.props.issues)
    const newTotal = IssueStatus.FIX_NOW in statuses ? statuses[IssueStatus.FIX_NOW] : 0
    const nextTotal = IssueStatus.FIX_NEXT_PR in statuses ? statuses[IssueStatus.FIX_NEXT_PR] : 0
    const laterTotal = IssueStatus.FIX_LATER in statuses ? statuses[IssueStatus.FIX_LATER] : 0
    const tooltip = status => <Tooltip id="tooltip">{getStatus(status).text}</Tooltip>

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
                width: '100%',
              }}
            >
              <span style={{ pagging: '10px', color: 'grey' }}>
                <i className="fa fa-search" aria-hidden="true" />
              </span>
              <input
                type="text"
                style={{
                  outline: 'none',
                  border: 'none',
                  marginLeft: '10px',
                  fontSize: '14px',
                  width: '100%',
                }}
              />
              <i
                className="fa fa-sort-amount-asc"
                style={{ color: 'lightgrey', margin: '1px 10px', fontSize: '16px' }}
                aria-hidden="true"
              />
            </div>
            <div style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }}>
              {newTotal} unresolved in this PR,
              {nextTotal} fix in next PR, {laterTotal} can be fixed later
            </div>

          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <ListGroup
              style={{
                fontSize: '13px',
                maxHeight: '500px',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              {this.props.issues.map(issue => (
                <ListGroupItem
                  key={_.uniqueId('listItem')}
                  style={{
                    padding: '10px 10px',
                    ...getStatus(issue.status).color,
                  }}
                >
                  <OverlayTrigger placement="top" overlay={tooltip(issue.status)}>
                    <Row>
                      <Col md={3} sm={6} xs={12}>
                        <div style={{ display: 'table' }}>
                          <Avatar {...issue.owner.slack} />
                          <div style={{ paddingLeft: '10px', display: 'table' }}>
                            <a href="#issue">{issue.title}</a>
                            <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                              <span>created by </span>
                              <a style={{ color: '#5a6082' }} href="#file">
                                {issue.owner.fullName}
                              </a>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={3} sm={3} xsHidden>
                        {subHeader('Location:')}
                        {issue.location && issue.location.filePath && issue.location.lineNumber
                          ? <a href="diff#">
                            {issue.location.filePath}@{issue.location.lineNumber}
                          </a>
                          : 'generic'}
                      </Col>
                      <Col md={3} sm={3} xsHidden>
                        {subHeader('Assigned to:')}
                        {issue.assignee.fullName}
                      </Col>
                      <Col md={3} smHidden xsHidden>
                        {subHeader('Created:')}
                        {moment(issue.created).fromNow()}
                      </Col>
                    </Row>
                  </OverlayTrigger>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default IssuesList
