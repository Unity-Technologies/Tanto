/* @flow */

/* eslint-disable */

import React, { PropTypes, Component } from 'react'
import { Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap'
import { ChangesetDelta, TestAvatar } from 'components'
import { Link } from 'react-router'

import './PullRequestList.css'

const subHeader = text => (
  <div
    style={{ color: '#8c8c8c', fontSize: '13px' }}
  >
    {text}
  </div>
)


class PullRequestList extends Component {
  constructor(props) {
    super(props)
    this.state = { search: null, activeKey: 3 }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(activeKey) {
    this.setState({ activeKey })
  }

  render() {
    const greenStatus = { borderLeft: '4px solid #d1fad1' }
    const yellowStatus = { borderLeft: '4px solid #ffcbad' }
    const greyStatus = { borderLeft: '4px solid lightgrey' }
    const { data } = this.props

    return (
      <div>
        <Row>
          <Col md={12}>

            <ListGroup
              fill
              style={{
                fontSize: '13px',
                overflowY: 'auto',
                overflowX: 'hidden' }}
            >
              {data.map(pr => (
                <ListGroupItem
                  style={{ padding: '10px 10px',
                  ...(pr.status === 1 ? greenStatus :
                  (pr.status === 2 ? yellowStatus : greyStatus)) }}
                >
                  <Row>
                    <Col md={5}>
                      <div style={{ display: 'table' }}>
                        <TestAvatar />
                        <div style={{ paddingLeft: '10px', display: 'table' }}>
                          <Link
                            to={`/project/${this.props.projectid}/pullrequest/${this.props.id}`}
                          >
                            {pr.title}
                          </Link>
                          <div style={{ fontSize: '12px', color: 'grey', fontStyle: 'italic' }}>
                            <strong>{pr.author}</strong>, added {pr.date}
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col md={2} >
                      <div>
                        {subHeader('Target:')}
                        <div>
                          <a style={{ textDecoration: 'none', color: '#5a6082' }} href="#to">{pr.to}</a>
                        </div>
                      </div>

                    </Col>

                    <Col md={2}>
                      {pr.build &&
                        <div>
                          {subHeader('Builds:')}
                          <a href="#st" style={{ color: pr.build.status === 'FAILED' ? '#e0708f' : '#5eb581', textTransform: 'uppercase', textDecoration: 'none' }}>
                            {pr.build.name}-{pr.build.status}
                          </a>
                          <div style={{ color: '#8c8c8c', fontSize: '12px' }}>{pr.build.date}</div>
                        </div>
                      }
                    </Col>


                    <Col md={2}>
                      {subHeader('Changes impact: HIGH')}
                      <ChangesetDelta
                        deleted={Math.floor((Math.random() * 100) + 20)}
                        added={Math.floor((Math.random() * 100) + 20)}
                        changed={Math.floor((Math.random() * 100) + 20)}
                      />
                    </Col>

                    <Col md={1} style={{ float: 'right' }}>
                      {this.props.showFollowIcon &&
                        <div
                          style={{
                            fontSize: '20px',
                            float: 'right',
                            cursor: 'pointer',
                            color: 'rgb(37, 146, 106)' }}
                        >
                          <i className="fa fa-rss" aria-hidden="true" /></div>
                      }
                      {this.props.showRemoveIcon &&
                        <div
                          style={{
                            fontSize: '20px',
                            float: 'right',
                            cursor: 'pointer',
                            color: '#aebac0' }}
                        ><i className="fa fa-trash" aria-hidden="true" />
                        </div>
                      }
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

PullRequestList.propTypes = {
  data: PropTypes.any,
  id: PropTypes.string.isRequired,
  projectid: PropTypes.string.isRequired,
  showFollowIcon: PropTypes.bool,
  showRemoveIcon: PropTypes.bool,
}

export default PullRequestList
