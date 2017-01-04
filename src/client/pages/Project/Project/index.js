/* @flow */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { fetchRepository } from 'ducks/repositories'

export type Props = {
  params: {
    id: string,
  },
  children?: Object,
  theme?: Object,
  name: string,
}

export const REPOSITORY_QUERY = `
query($name: String!) {
	repository(name: $name) {
    id
    name,
    fullName,
    branches {
      name
      revision
    }
  }
}`

class Project extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRepository(this.props.name, REPOSITORY_QUERY))
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

