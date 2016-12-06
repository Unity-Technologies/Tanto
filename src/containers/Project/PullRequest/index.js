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
import { actions } from 'ducks/pullRequest'
import type { PullRequestGraphType } from 'ducks/pullRequest'

import LoadingIcon from 'components/LoadingIcon'

import LayoutDeveloper from './Layouts/LayoutDeveloper'
import LayoutGuardian from './Layouts/LayoutGuardian'
import StickyActionBar from './StickyActionBar'

type Props = {
  dispatch: Function,
  isFetching: boolean,
  params: {
    id: string,
    prid: string,
  },
  persona: 'DEVELOPER_PERSONA' | 'MANAGER_PERSONA' | 'GUARDIAN_PERSONA',
  pullRequest: ?PullRequestGraphType,
};

export type Props = {
  dispatch: Function,
  isFetching: boolean,
  params: Object,
  persona: DEVELOPER_PERSONA | MANAGER_PERSONA | GUARDIAN_PERSONA,
  pullRequest?: Object,
};

class PullRequest extends Component {
  props: Props;

  componentDidMount() {
    const { dispatch, params } = this.props
    const pullRequestId = parseInt(params.prid, 10)
    dispatch(actions.fetchStart(pullRequestId))
  }

  props: Props;

  render() {
    const { isFetching, pullRequest, persona } = this.props

    if (isFetching) {
      return <LoadingIcon />
    }

    if (!pullRequest) {
      return <div>The requested pull request was not found...</div>
    }

    return (
      <StickyContainer style={{ fontSize: '14px' }}>
        <Helmet title={`Pull Request: ${pullRequest.title}`} />
        <StickyActionBar />
        <div>
          {persona === DEVELOPER_PERSONA &&
            <LayoutDeveloper pullRequest={pullRequest} />
          }
          {persona === MANAGER_PERSONA &&
            <LayoutGuardian pullRequest={pullRequest} />
          }
          {persona === GUARDIAN_PERSONA &&
            <LayoutGuardian pullRequest={pullRequest} />
          }
        </div>
      </StickyContainer>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    isFetching: state.pullRequest.isFetching,
    params: ownProps.params,
    persona: state.session.persona,
    pullRequest: state.pullRequest.pullRequest,
  })
)(PullRequest)
