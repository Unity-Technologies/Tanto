/* @flow */

import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import NotificationList from 'components/NotificationList'

export type Props = { profile?: Object };

class Home extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: Props) {
    super(props)
    this.state = { open: true }
  }

  props: Props

  state: {
    open: boolean,
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <div>
          <Row>
            <Col md={12}>
              <h4 style={{ margin: '0 15px' }}>My Activity</h4>
              <NotificationList />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Home
