// TODO: add flow annotations

/* eslint-disable */

import React, { Component, PropTypes } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { NotificationList } from 'components'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { open: true }
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

Home.propTypes = {
  profile: PropTypes.object,
}

export default connect(state => ({
  profile: state.session.profile,
}))(Home)
