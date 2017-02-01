/* @flow */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { fetchRepository } from 'ducks/repositories/actions'

export type Props = {
  params: {
    id: string,
  },
  children?: Object,
  theme?: Object,
  name: string,
}

class Project extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRepository(this.props.name))
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        theme: this.props.theme,
      })
    )

    return (
      <div>
        <Helmet title={`Project ${this.props.name}`} />
        {childrenWithProps}
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    name: props.params.splat,
  })
)(Project)

