/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  GUARDIAN_PERSONA,
  DEVELOPER_PERSONA,
  MANAGER_PERSONA,
} from 'universal/constants'
import type { PullRequestGraphType } from 'universal/types'
import LayoutDeveloper from './Layouts/LayoutDeveloper'
import LayoutGuardian from './Layouts/LayoutGuardian'
import Helmet from 'react-helmet'
import ActionBar from './ActionBar'
import {
  fetchPullRequestDiff,
  fetchPullRequestMetadata,
  fetchPullRequestDiscussion,
} from 'ducks/pullrequests/actions'


type Props = {
  dispatch: Function,
  title: string,
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
}

class PullRequest extends Component {
  componentDidMount() {
    const id = this.props.params.prid
    this.props.dispatch(fetchPullRequestMetadata(id))
    this.props.dispatch(fetchPullRequestDiscussion(id))
    this.props.dispatch(fetchPullRequestDiff(id))
  }

  props: Props

  render() {
    const { persona, params, location, title } = this.props

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
        <ActionBar />
        <Helmet title={`Pull Request: ${title}`} />

        {currentCategory === MANAGER_PERSONA || currentCategory === GUARDIAN_PERSONA ?
          <LayoutGuardian pullRequestId={params.prid} />
          :
          <LayoutDeveloper
            pullRequestId={params.prid}
            currentCategory={currentCategory}
            rootPath={rootPath}
          />
        }
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    params: props.params,
    persona: state.session.persona,
  })
)(PullRequest)
