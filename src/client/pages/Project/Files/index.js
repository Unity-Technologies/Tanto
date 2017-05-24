/* @flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

export type Props = {
  data: Array<any>,
}

class Files extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = { currentNode: this.props.data || null }
  }


  render() {
    return (
      <div>
        <Helmet title="Files" />
        <h2> This page is still under construction </h2>
      </div>
    )
  }
}

export default connect(state => ({
  pathname: state.routing.locationBeforeTransitions.pathname,
  data: [],
}))(Files)
