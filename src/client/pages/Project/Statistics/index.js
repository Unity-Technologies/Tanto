/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

export type Props = {
  params: {
    prid: string
  }
}

function Statistics({ params: { prid } }: Props) {
  return (
    <div>
      <Helmet title="Statistics" />
      <h3>Statistics {prid}</h3>
    </div>
  )
}

export default connect(
  state => ({
    isFetching: state.session.isFetching,
  })
)(Statistics)
