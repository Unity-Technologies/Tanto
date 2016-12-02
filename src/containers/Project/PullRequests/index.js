// TODO: add flow annotations

import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import {
  Filter,
  BranchSelect,
  PullRequestList,
} from 'components'
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
// import { fetchUserPRs, fetchUserReviewPRs } from 'redux-modules/user'
import { Sticky, StickyContainer } from 'react-sticky'
import { PullRequestsDataList } from '../../../api/testPullRequest'
import { sort } from '../../../api/testData'

const approveButtonStyle = {
  backgroundColor: '#1fb5ad',
  borderColor: '#1fb5ad',
  color: 'white',
}


class PullRequests extends Component {
  componentDidMount() {
  //  const { dispatch } = this.props
      // TODO: should not be users PR fetch - should be replaced with the project pull requests
    // dispatch(fetchUserPRs())
    // dispatch(fetchUserReviewPRs())
  }

  render() {
    const {
      // isFetching,
      project_pullrequests,
      params: { id },
    } = this.props

    // TODO : remove this
    project_pullrequests.map((item) => {
      const randomStatus = Math.floor(Math.random() * 4)
      item.status = randomStatus // eslint-disable-line no-param-reassign
      return true
    })

    return (
      <div>
        <Helmet title="Project Pull Requests" />
        <StickyContainer>

          <Sticky
            style={{
              zIndex: 1030,
              backgroundColor: '#f8f8f8',
              marginBottom: '20px',
              border: '1px solid rgb(226, 226, 226)',
              borderRadius: '4px',
            }}
          >
            <div style={{ padding: '10px' }}>
              <Row>
                <Col md={3}>
                  <div
                    style={{
                      display: 'inline-flex',
                      border: '1px solid lightgrey',
                      borderRadius: '5px',
                      padding: '7px',
                      width: '100%',
                      backgroundColor: 'white' }}
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

                  </div>
                </Col>

                <Col md={3}>
                  <BranchSelect project={id} placeholder="Select branch ..." />
                </Col>

                <Col md={4}>
                  <div style={{ float: 'left', marginRight: '5px' }}>
                    <Filter data={sort} placeholder="Order by..." />
                  </div>
                  <div style={{ float: 'left', marginRight: '5px' }}>
                    <a
                      className="btn"
                      style={{
                        color: 'white',
                        backgroundColor: '#b9ebae' }} aria-label="Sort ascending"
                    >
                      <i className="fa fa-sort-amount-asc" aria-hidden="true" />
                    </a>
                  </div>
                  <div style={{ float: 'left' }}>
                    <a
                      className="btn"
                      style={{
                        color: 'white',
                        backgroundColor: 'lightgrey' }} aria-label="Sort descending"
                    >
                      <i className="fa fa-sort-amount-desc" aria-hidden="true" />
                    </a>
                  </div>
                </Col>

                <Col md={2}>
                  <ButtonGroup style={{ float: 'right' }}>
                    <Button style={approveButtonStyle}>
                    New Pul</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </div>

          </Sticky>
          <PullRequestList data={PullRequestsDataList} />
        </StickyContainer>
      </div>
    )
  }
}

PullRequests.propTypes = {
  // isFetching: PropTypes.bool.isRequired,
  // errors: PropTypes.array,
  // dispatch: PropTypes.func.isRequired,
  project_pullrequests: PropTypes.array,
  // theme: PropTypes.object,
  params: PropTypes.object,
}

export default connect(
  state => ({
    isFetching: state.session.isFetching,
    errors: state.session.errors || [],
    project_pullrequests: [...state.session.pullrequests_my, ...state.session.pullrequests_review],
  })
)(PullRequests)
