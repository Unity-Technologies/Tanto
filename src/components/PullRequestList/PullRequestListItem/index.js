// TODO: add flow annotations

import React, { Component } from 'react'
import { Col, Row, ListGroupItem } from 'react-bootstrap'
import { TestAvatar } from 'components'
import { Link } from 'react-router'
import { fromNow } from 'utils/datetime'
import { PullRequestGraphType } from 'services/ono/queries/pullrequests'

import './styles.css'

const subHeader = text => (
  <div className="sub-header">
    {text}
  </div>
)

export type Props = {
  pullRequest: PullRequestGraphType,
  // TODO: replace with the build type in the future
  build: Object,
  showRemoveIcon: boolean,
}

class PullRequestListItem extends Component {
  constructor(props: Props) {
    super(props)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  props: Props

  handleRemoveClick() {
    if (this.onRemoveClick) {
      this.onRemoveClick(this.id)
    }
  }

  render() {
    const { pullRequest, build, showRemoveIcon } = this.props

    return (
      <ListGroupItem className={`${pullRequest.status.replace('_', '-')}-status`}>
        <Row>
          <Col md={5}>
            <div style={{ display: 'table' }}>
              <TestAvatar />
              <div style={{ paddingLeft: '10px', display: 'table' }}>
                <Link to={pullRequest.link}>{pullRequest.title}</Link>
                <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                  <strong>{pullRequest.owner.fullName}</strong>
                    updated {fromNow(pullRequest.updated)}
                </div>
              </div>
            </div>
          </Col>
          <Col md={3} >
            <div style={{ overflowWrap: 'break-word' }}>
              {subHeader('Origin:')}
              <div>
                <Link
                  style={{ textDecoration: 'none', color: 'rgb(59, 120, 155)' }}
                  to={pullRequest.originLink}
                >
                  {pullRequest.origin.repository.name}
                  <span style={{ color: '#8ea7b6' }}>#</span>{pullRequest.origin.branch}
                </Link>
              </div>
            </div>
          </Col>
          <Col md={3} >
            <div>
              {subHeader('Target:')}
              <div style={{ overflowWrap: 'break-word' }}>
                <Link
                  style={{ textDecoration: 'none', color: 'rgb(59, 120, 155)' }}
                  to={pullRequest.targetLink}
                >
                  {pullRequest.target.repository.name}
                </Link>
              </div>
            </div>
          </Col>
          {build &&
            <Col md={2}>
              <div style={{ overflowWrap: 'break-word' }}>
                {subHeader('Latest build:')}
                <Link
                  className={`build-${build.status}`}
                  style={{ textDecoration: 'none', textTransform: 'uppercase' }}
                  to={build.link}
                >
                  {build.name}-{build.number}
                </Link>
                <div style={{ color: '#8c8c8c', fontSize: '12px' }}>{fromNow(build.date)}</div>
              </div>
            </Col>
          }
          {showRemoveIcon &&
            <Col md={build ? 1 : 3} style={{ float: 'right' }}>
              <div
                onClick={this.handleRemoveClick}
                className="remove-icon"
              >
                <i className="fa fa-trash" aria-hidden="true" />
              </div>
            </Col>
          }
        </Row>
      </ListGroupItem>
    )
  }
}

export default PullRequestListItem
