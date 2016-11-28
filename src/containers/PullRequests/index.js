/* eslint-disable */

import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
// import CircularProgress from 'material-ui/CircularProgress'
import { PullRequestList, Filter, BranchSelect } from 'components'
import { connect } from 'react-redux'
import { actions } from 'ducks/pullrequests'
import { selectors as sessionSelectors } from 'ducks/session'
import { Tabs, Tab, Col, Row, Button, ButtonGroup, Badge } from 'react-bootstrap'
import { Sticky, StickyContainer } from 'react-sticky'

import { sort } from '../../api/testData'

const approveButtonStyle = {
  backgroundColor: '#1fb5ad',
  borderColor: '#1fb5ad',
  color: 'white',
}

const tabTitle = (text, badge) => (
  <div style={{ display: 'inline-flex' }}>
    <div style={{ float: 'left', marginRight: '5px' }}>{text}</div>
    {!!badge && <div style={{ marginRight: '15px' }}><Badge>{badge}</Badge></div>}
  </div>
)


class PullRequests extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    this.toggleReviewers = this.toggleReviewers.bind(this)
    dispatch(actions.fetchUserAssignedPullRequests())
    dispatch(actions.fetchUserPullRequests())
    // dispatch(actions.fatchUserWatchingPullRequests())
  }

  toggleReviewers() {
    const toggled = this.state.toggleReviewers
    this.setState({ toggleReviewers: !toggled })
  }


  render() {
    const {
      // isSending,
      pullrequests,
      pullrequestsAssigned,
      pullrequestsWatching,
      // errors,
    } = this.props

    return (
      <StickyContainer>
        <Helmet title="Pull Requests" />

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
                <BranchSelect placeholder="Select branch ..." />
              </Col>

              <Col md={4}>
                <div style={{ float: 'left', marginRight: '5px' }}><Filter data={sort} placeholder="Order by..." /></div>
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
                    New Pull Request
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </div>

        </Sticky>
        <div >
          <Tabs animation={false} defaultActiveKey={1}>
            <Tab
              eventKey={1}
              title={tabTitle('Pull request on review', 4)}
              style={{ padding: '20px 0' }}
            >
              <div
                style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }}
              >
              156 in total, 100 are in progress, 30 are just opened
              </div>
              <PullRequestList data={pullrequestsAssigned} />
            </Tab>
            <Tab
              eventKey={2}
              title={tabTitle('My pull request', 14)}
              style={{ padding: '20px 0' }}
            >
              <div
                style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }}
              >
              15 in total, 10 are in progress, 3 are just opened
              </div>
              <PullRequestList data={pullrequests} showRemoveIcon />
            </Tab>
            <Tab
              eventKey={3}
              title={tabTitle('Followed pull request', 5)}
              style={{ padding: '20px 0' }}
            >
              <div
                style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }}
              >
              156 in total, 100 are in progress, 30 are just opened
              </div>
              <PullRequestList data={pullrequestsWatching} showFollowIcon />
            </Tab>
          </Tabs>
        </div>
      </StickyContainer>)
  }
}

PullRequests.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  pullrequests: PropTypes.array.isRequired,
  pullrequestsAssigned: PropTypes.array.isRequired,
  pullrequestsWatching: PropTypes.array.isRequired,
}

export default connect(
  state => ({
    isFetching: state.pullrequests.isFetching,
    errors: state.pullrequests.error || [],
    pullrequests: sessionSelectors.getPullRequests(state) || [],
    pullrequestsAssigned: sessionSelectors.getPullRequestsAssigned(state) || [],
    pullrequestsWatching: sessionSelectors.getPullRequestsWatching(state) || [],
  })
)(PullRequests)
