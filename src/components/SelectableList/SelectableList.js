/* eslint-disable */

import React, { Component, PropTypes } from 'react'
import { List, makeSelectable } from 'material-ui/List'

function wrapState(ComposedComponent) {
  class selectableList extends Component {
    constructor(props: Props){
      super(props)
      this.handleRequestChange = this.handleRequestChange.bind(this)
    }

    props: Props;

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue > -1 ? this.props.defaultValue : 0,
      })
    }

    handleRequestChange(event, index) {
      this.setState({
        selectedIndex: index,
      })
    }

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      )
    }
  }

  return selectableList
}

const SelectableList = wrapState(makeSelectable(List))  // eslint-disable-line new-cap

export default SelectableList
