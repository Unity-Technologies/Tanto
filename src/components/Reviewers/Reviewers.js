/* @flow */
import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import TestAvatar from '../TestAvatar'

type Reviewer = {
  name: string,
  type: string,
}

export type Props = {
  reviewers: Array<Reviewer>,
  onAdded: null | Function,
}

class Reviewers extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: Props) {
    super(props)
    this.state = { search: null, reviewers: this.props.reviewers };

    (this:any).addReviewer = this.addReviewer.bind(this)
  }

  props: Props

  state: {
    search: ?string,
    reviewers: Array<Reviewer>
  }

  addReviewer(value: Reviewer) {
    const list = this.state.reviewers

    if (this.props.onAdded) {
      this.props.onAdded(value)
      list.splice(list.indexOf(value), 1)
      this.setState({ reviewers: list })
    }
  }

  render() {
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
                  width: '100%' }}
              />
            </div>
          {this.state.reviewers.length !== 0 &&
            <div
              style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }}
              active
            >
              Some modified files do not have a reviewer, potential additional reviewers:
            </div>
          }
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
              {this.state.reviewers.map(reviewer => (
                <ListGroupItem style={{ padding: '10px 10px' }} >
                  <Row>
                    <Col md={10}>
                      <div style={{ display: 'inline-flex' }}>
                        <TestAvatar />
                        <div style={{ padding: '0 10px' }}><div style={{ fontSize: '16px' }}>
                          <strong>{reviewer.name}</strong></div>
                          <span style={{ color: 'grey', fontSize: '13px' }}>{reviewer.type}</span>
                        </div>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div
                        onClick={() => this.addReviewer(reviewer)}
                        style={{
                          color: '#dbdedf',
                          float: 'right',
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        <i className="fa fa-plus" aria-hidden="true" />
                      </div>
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

export default Reviewers
