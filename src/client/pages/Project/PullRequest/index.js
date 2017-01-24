/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DEVELOPER_PERSONA, MANAGER_PERSONA, GUARDIAN_PERSONA } from 'ducks/session'
import type { PullRequestGraphType } from 'services/ono/queries/pullRequest'
import LayoutDeveloper from './Layouts/LayoutDeveloper'
import LayoutGuardian from './Layouts/LayoutGuardian'
import Helmet from 'react-helmet'
import ActionBar from './ActionBar'

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
