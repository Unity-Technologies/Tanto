/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { DEVELOPER_PERSONA, MANAGER_PERSONA, GUARDIAN_PERSONA } from 'ducks/session'
import { fetchPullRequestData } from 'ducks/pullrequests'
import {
  getPullRequest,
  getPullRequestFetchStatus,
  getPullRequestFetchError,
} from 'ducks/pullrequests/selectors'
import type { PullRequestGraphType } from 'services/ono/queries/pullRequest'
import LoadingIcon from 'components/LoadingIcon'
import LayoutDeveloper from './Layouts/LayoutDeveloper'
import LayoutGuardian from './Layouts/LayoutGuardian'
import ActionBar from './ActionBar'

type Props = {
  dispatch: Function,
  error: ?string,
  isFetching: boolean,
  params: {
    id: string,
    prid: string,
    category: ?string,
  },
  location: {
    pathname: string,
    query: Object,
  },
  persona: 'DEVELOPER_PERSONA' | 'MANAGER_PERSONA' | 'GUARDIAN_PERSONA',
  pullRequest: ?PullRequestGraphType,
};

class PullRequest extends Component {

  componentDidMount() {
    const { dispatch, params } = this.props
    const pullRequestId = parseInt(params.prid, 10)
    dispatch(fetchPullRequestData(pullRequestId))
  }

  props: Props

  render() {
    const { isFetching, error, pullRequest, persona, params, location } = this.props

    if (isFetching) {
      return <LoadingIcon />
    }

    if (error) {
      return (
        <div>
          <h3>
            Fetching the pull request failed!
          </h3>
          <h4>{`${error}`}</h4>
        </div>
      )
    }

    if (!pullRequest) {
      return <div>The requested pull request was not found...</div>
    }

    let rootPath = location.pathname
    if (params.category) {
      // TODO: I don't like this, but react-router is not handling
      // relative URLs, so we need to strip the category part of the url...
      // There might be a better way. Or just using query params?
      rootPath = rootPath.replace(new RegExp(`/${params.category}$`), '')
    }

    const defaultCategory = (!persona || persona === DEVELOPER_PERSONA) ? 'summary' : 'guardian'
    const currentCategory = params.category || defaultCategory

    return (
      <div>
        <Helmet title={`Pull Request: ${pullRequest.title}`} />
        <ActionBar />
        {currentCategory === MANAGER_PERSONA || currentCategory === GUARDIAN_PERSONA ?
          <LayoutGuardian pullRequest={pullRequest} />
        :
          <LayoutDeveloper
            currentCategory={currentCategory}
            pullRequest={pullRequest}
            rootPath={rootPath}
          />
        }
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    error: getPullRequestFetchError(state),
    isFetching: getPullRequestFetchStatus(state),
    params: props.params,
    persona: state.session.persona,
    pullRequest: getPullRequest(state, props),
  })
)(PullRequest)
