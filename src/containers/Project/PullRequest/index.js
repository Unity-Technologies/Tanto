/* @flow */

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { StickyContainer } from 'react-sticky'

import {
  GUARDIAN_PERSONA,
  DEVELOPER_PERSONA,
  MANAGER_PERSONA,
} from 'ducks/session'

import LayoutDeveloper from './Layouts/LayoutDeveloper'
import LayoutGuardian from './Layouts/LayoutGuardian'
import { prDescription } from '../../../api/testData'
import StickyActionBar from './StickyActionBar'

class PullRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pullRequest: {
        title: 'Some pull request title',
        description: prDescription,
        reviewers: ['Alex', 'NaTosha', 'Bob', 'John'],
        from: 'default',
        to: '5.3/default',
        author: 'kate',
        versions: ['link1', 'link2', 'link3'],
        votes: {
          accepted: 2,
          rejected: 1,
          pending: 1,
        },
      },
    }
  }

  render() {
    // const { params: { id }, theme, user, persona } = this.props
    // const notOwner = user !== this.state.pullRequest.author
    const { persona } = this.props
    return (
      <StickyContainer style={{ fontSize: '14px' }}>
        <Helmet title="Pull Request Title" />
        <StickyActionBar />
        <div>
          {persona === DEVELOPER_PERSONA &&
            <LayoutDeveloper />
          }
          {persona === MANAGER_PERSONA &&
            <LayoutGuardian />
          }
          {persona === GUARDIAN_PERSONA &&
            <LayoutGuardian />
          }
        </div>
      </StickyContainer>
    )
  }
}

PullRequest.propTypes = {
 // isFetching: PropTypes.bool.isRequired,
 // errorMessage: PropTypes.string,
  // params: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  // user: PropTypes.string,
  persona: PropTypes.oneOf([DEVELOPER_PERSONA, MANAGER_PERSONA, GUARDIAN_PERSONA]).isRequired,
}

export default connect(
  state => ({
    isFetching: state.session.isFetching,
    persona: state.session.persona,
  })
)(PullRequest)
