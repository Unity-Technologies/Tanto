
import React from 'react'
import _ from 'lodash'

class PureComponent extends React.PureComponent {
  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
  }
}

export const pureComponent = BaseComponent => class extends PureComponent {
  render() {
    return <BaseComponent {...this.props} />
  }
}

export default PureComponent

