/* @flow */

import React from 'react'
import { pureComponent } from 'components/PureComponent'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { getRepoDescription } from 'ducks/repositories/selectors'

export type Props = {
  repoName: string,
  description: string,
}


function Overview({ repoName, description }: Props) {
  return (
    <div>
      <Helmet title={`Project ${repoName}`} />
      <div style={{ fontSize: '14px' }}>
        <strong>Description:</strong> {description}
      </div>
    </div>
  )
}

export default connect((state, props) => ({
  repoName: props.params.splat,
  description: getRepoDescription(state, props),
}))(pureComponent(Overview))
