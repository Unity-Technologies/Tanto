/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import {
  DEVELOPER_PERSONA,
} from 'universal/constants'
import type { PullRequestGraphType } from 'universal/types'
import LayoutDeveloper from './Layouts/LayoutDeveloper'
import Helmet from 'react-helmet'
import { getPersona } from 'ducks/session/selectors'
import ActionBar from './ActionBar'


type Props = {
  dispatch: Function,
  title: string,
  params: {
    id: string,
    prid: string,
    category: ?string,
    splat:string,
  },
  location: {
    pathname: string,
    query: Object,
  },
  persona: string,
  pullRequest: ?PullRequestGraphType,
}

const PullRequest = (props: Props) => {
  const { persona, params, location, title } = props

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
      <LayoutDeveloper
        repoName={params.splat}
        pullRequestId={params.prid}
        currentCategory={currentCategory}
        rootPath={rootPath}
      />
    </div>
  )
}


export default connect(
  (state, props) => ({
    persona: getPersona(state),
  })
)(PullRequest)
