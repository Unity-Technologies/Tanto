/* @flow */

import React from 'react'

/**
 * Higher order component wrapping React.PureComponent.
 *
 * Example:
 * const ExpensiveComponent = ({ propA, propB }) => {...}
 * const OptimizedComponent = pureComponent(ExpensiveComponent)
 */
const pureComponent = BaseComponent => class extends React.PureComponent {
  render() {
    return <BaseComponent {...this.props} />
  }
}

export default pureComponent
