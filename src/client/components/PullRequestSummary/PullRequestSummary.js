/* @flow */
import moment from 'moment'
import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListGroup from 'react-bootstrap/lib/ListGroup'

import type { PullRequestGraphType } from 'services/ono/queries/pullRequest'
import Reviewers from './Reviewers'
import UserAvatar from '../UserAvatar'
import { pluralizedText } from 'utils/text'

import { prReviewers } from '../../api/testPullRequest'


const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const info = {
  borderLeft: '5px solid rgba(226, 231, 245, 0.62)',
}

const inProgress = {
  borderLeft: '5px solid #f7e99c',
}

const danger = {
  borderLeft: '5px solid rgb(255, 208, 208)',
}

const success = {
  borderLeft: '5px solid rgb(214, 247, 229)',
}

const inProgressColor = 'rgb(198, 149, 10)'
const approvedColor = '#3f855b'
const dangerColor = '#e96666'

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

export type PullRequestSummaryPaths = {
  origin: {
    url: string,
    label: string,
  },
  target: {
    url: string,
    label: string,
  }
}

type PullRequestSummaryProps = {
  onAddReviewer: Function,
  onToggleReviewers: Function,
  paths: PullRequestSummaryPaths,
  pullRequest: PullRequestGraphType,
  toggleReviewers: boolean,
}

export const PullRequestHeader = ({ pullRequest } : { pullRequest: PullRequestGraphType }) =>
  <div style={{ display: 'inline-block' }}>
    <UserAvatar
      src={null}  // FIXME
      style={{ float: 'left', display: 'table-column' }}
    />
    <div style={{ padding: '0 10px', display: 'table' }}>
      <div style={{ fontSize: '16px' }}>
        <strong>{pullRequest.title}</strong>
      </div>
      <span style={{ color: 'grey', fontSize: '13px' }}>
        created {moment(pullRequest.created).fromNow()}
        {' '} by {pullRequest.owner.fullName} ({pullRequest.owner.username})
      </span>
    </div>
  </div>


export const ChangesSection = ({ pullRequest } : { pullRequest: PullRequestGraphType }) =>
  <ListGroupItem style={info}>
    <Row>
      <Col md={5}>
        <div style={headerColumnStyle}>
          Changes
        </div>
      </Col>
      <Col md={7}>
        <div>
          {/* TODO: additions/deletions could be moved to backend */}
          <span>{pluralizedText('file', 'files', pullRequest.files.length)} changed</span><br />
          <span style={{ color: '#55a532' }}>
            + {pullRequest.files.reduce((sum, f) => sum + f.stats.added, 0)}
          </span>
          <span style={{ color: '#bd2c00' }}>
            {' '}− {pullRequest.files.reduce((sum, f) => sum + f.stats.deleted, 0)}
          </span>
        </div>
      </Col>
    </Row>
  </ListGroupItem>


export const RepositoriesSection = ({ pullRequest, paths } : {
    paths: PullRequestSummaryPaths,
    pullRequest: PullRequestGraphType
}) =>
  <ListGroupItem style={info}>
    <Row>
      <Col md={5}>
        <div style={headerColumnStyle}>
          Repositories
        </div>
      </Col>
      <Col md={7}>
        <div>
          Origin: <a href={paths.origin.url}>{paths.origin.label}</a>
          <br />
          Target: <a href={paths.target.url}>{paths.target.label}</a>
        </div>
      </Col>
    </Row>
  </ListGroupItem>


export const ReviewersSection = (props: PullRequestSummaryProps) =>
  <ListGroupItem style={inProgress}>
    <Row>
      <Col md={2}>
        <div style={headerColumnStyle}>
          Code review
        </div>
      </Col>
      <Col md={3}>
        {subHeader('Status:')}
        <div style={{ color: inProgressColor, textTransform: 'uppercase' }}>
          in progress
        </div>
        <div style={{ fontSize: '12px' }}>(4 pending responses)</div>
      </Col>
      <Col md={6}>
        {subHeader('Reviewers:')}
        <Row>
          <Col md={1}>
            <span style={{ color: approvedColor, fontSize: '16px', marginRight: '10px' }}>
              <i className="fa fa-check" aria-hidden="true" />
            </span>
          </Col>
          <Col md={11}>
            <div style={{ fontSize: '13px' }}>
              Alexey Zakharov, Scott Bilas, Aras Pranckevičius, Tim Cooper
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={1}>
            <span
              style={{ color: 'rgb(128, 154, 206)', fontSize: '16px', marginRight: '10px' }}
            >
              <i className="fa fa-circle-o-notch fa-spin fa-fw" />
            </span>
          </Col>
          <Col md={11}>
            <div style={{ fontSize: '13px' }}>
              Ante Ilic, Alex Lian
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={1}>
            <span style={{ color: 'grey', fontSize: '16px', marginRight: '10px' }}>
              <i className="fa fa-question" aria-hidden="true" />
            </span>
          </Col>
          <Col md={11}>
            <div style={{ fontSize: '13px' }}>
              {props.pullRequest.reviewers.map(r => r.user.fullName).join(', ')}
            </div>
          </Col>
        </Row>
        {props.toggleReviewers &&
          <Row style={{ paddingTop: '20px', paddingLeft: '50px' }}>
            <Reviewers reviewers={prReviewers} onAdded={props.onAddReviewer} />
          </Row>
        }
      </Col>
      <Col md={1}>
        <div
          onClick={props.onToggleReviewers}
          style={{ color: '#dbdedf', float: 'right', fontSize: '20px', cursor: 'pointer' }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </div>
      </Col>
    </Row>
  </ListGroupItem>


export const BuildSection = ({ pullRequest } : { pullRequest: PullRequestGraphType }) =>
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


export const IssuesSection = ({ pullRequest } : { pullRequest: PullRequestGraphType }) =>
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


const PullRequestSummary = (props: PullRequestSummaryProps) =>
  <div className="PullRequestSummary">
    <PullRequestHeader pullRequest={props.pullRequest} />
    <Row>
      <Col md={12}>
        <ListGroup style={{ marginTop: '20px' }}>
          <ChangesSection {...props} />
          <RepositoriesSection {...props} />
          <ReviewersSection {...props} />
          <BuildSection {...props} />
          <IssuesSection {...props} />
        </ListGroup>
      </Col>
    </Row>
  </div>


export default PullRequestSummary