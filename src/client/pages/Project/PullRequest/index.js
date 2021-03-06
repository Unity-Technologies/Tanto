/* @flow */

import React from 'react'
import { pureComponent } from 'components/PureComponent'
import Helmet from 'react-helmet'
import LayoutDeveloper from './Layouts/LayoutDeveloper'

import ActionBar from './ActionBar'

type Props = {
  title: string,
  params: $Subtype<{
    splat: string,
    category: string,
    prid: string
  }>,
  location: Object,
}

const PullRequest = (props: Props) => {
  const { params, location, title } = props

  let rootPath = location.pathname
  if (params.category) {
    // TODO: I don't like this, but react-router is not handling
    // relative URLs, so we need to strip the category part of the url...
    // There might be a better way. Or just using query params?
    rootPath = rootPath.replace(new RegExp(`/${params.category}$`), '')
  }

  const defaultCategory = 'summary'
  const currentCategory = params.category || defaultCategory

  return (
    <div>
      <ActionBar repoName={params.splat} pullRequestId={params.prid} />
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

export default pureComponent(PullRequest)
