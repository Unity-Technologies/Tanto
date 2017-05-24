// TODO: fix flow for build property

import React from 'react'

import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import PureComponent from 'components/PureComponent'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { buildPullRequestLink, buildProjectLink } from 'routes/helpers'
import Avatar from 'components/Avatar'
import { Link } from 'react-router'
import { fromNow } from 'utils/datetime'
import { PullRequestGraphType } from 'universal/types'

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
  showRemoveButton: boolean,
}

class PullRequestListItem extends PureComponent {
  props: Props

  handleRemoveClick = () => {
    if (this.onRemoveClick) {
      this.onRemoveClick(this.id)
    }
  }

  render() {
    const { pullRequest, build, showRemoveButton } = this.props

    return (
      <ListGroupItem className={`${pullRequest.status.replace('_', '-')}-status`}>
        <Row>
          <Col md={5}>
            <div style={{ display: 'table' }}>
              <Avatar {...pullRequest.owner.slack} />
              <div style={{ paddingLeft: '10px', display: 'table' }}>
                <Link
                  to={buildPullRequestLink(pullRequest.target.repository.fullName, pullRequest.id)}
                >
                  {pullRequest.title}
                </Link>
                <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                  <strong>{pullRequest.owner.fullName}</strong>
                  <span> updated {fromNow(pullRequest.updated)}</span>
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
                  to={{
                    pathname: buildProjectLink(pullRequest.origin.repository.fullName),
                    query: { branch: pullRequest.origin.name },
                  }}
                >
                  {pullRequest.origin.repository.name}
                  <span style={{ color: '#8ea7b6' }}>#</span>{pullRequest.origin.name}
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
                  to={{
                    pathname: buildProjectLink(pullRequest.target.repository.fullName),
                    query: { branch: pullRequest.target.name },
                  }}
                >
                  {pullRequest.target.repository.name}
                  <span style={{ color: '#8ea7b6' }}>#</span>{pullRequest.target.name}
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
          {showRemoveButton &&
            <Col md={1} style={{ float: 'right' }}>
              <div
                role="link"
                tabIndex={0}
                onClick={this.handleRemoveClick}
                className="remove-icon"
              >
                <i className="fa fa-trash" />
              </div>
            </Col>
          }
        </Row>
      </ListGroupItem>
    )
  }
}

export default PullRequestListItem
