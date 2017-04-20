/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  GUARDIAN_PERSONA,
  DEVELOPER_PERSONA,
} from 'universal/constants'
import type { PullRequestGraphType } from 'universal/types'
import LayoutDeveloper from './Layouts/LayoutDeveloper'
import LayoutGuardian from './Layouts/LayoutGuardian'
import Helmet from 'react-helmet'
import { getPersona } from 'ducks/session/selectors'
import ActionBar from './ActionBar'

import {
  fetchPullRequestFilesList,
  fetchPullRequestMetadata,
  fetchPullRequestDiscussion,
  fetchPullRequestIssues,
  fetchPullRequestChangeset,
  fetchPullRequestReviews,
} from 'ducks/pullrequests/actions'

type Props = {
  dispatch: Function,
  title: string,
  match: Object,
  params: {
    id: string,
    prid: string,
    category: ?string,
  },
  location: {
    pathname: string,
    query: Object,
  },
  persona: string,
  pullRequest: ?PullRequestGraphType,
}

class PullRequest extends Component {

  componentWillMount() {
    const id = this.props.match.params.prid
    this.props.dispatch(fetchPullRequestMetadata(id))
    this.props.dispatch(fetchPullRequestDiscussion(id))
    this.props.dispatch(fetchPullRequestFilesList(id))
    this.props.dispatch(fetchPullRequestIssues(id))
    this.props.dispatch(fetchPullRequestChangeset(id))
    this.props.dispatch(fetchPullRequestReviews(id))
  }

  props: Props

  render() {
    const { persona, match, location, title } = this.props

    let rootPath = location.pathname
    if (match.params.category) {
      // TODO: I don't like this, but react-router is not handling
      // relative URLs, so we need to strip the category part of the url...
      // There might be a better way. Or just using query params?
      rootPath = rootPath.replace(new RegExp(`/${match.params.category}$`), '')
    }

    const defaultCategory = (!persona || persona === DEVELOPER_PERSONA) ? 'summary' : 'guardian'
    const currentCategory = match.params.category || defaultCategory

    return (
      <div>
        <ActionBar />
        <Helmet title={`Pull Request: ${title}`} />

        {persona === GUARDIAN_PERSONA ?
          <LayoutGuardian pullRequestId={match.params.prid} />
         :
          <LayoutDeveloper
            pullRequestId={match.params.prid}
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
    persona: getPersona(state),
  })
)(PullRequest)
