/* eslint-disable */

import React, { Component, PropTypes } from 'react'
import { List, makeSelectable } from 'material-ui/List'

function wrapState(ComposedComponent) {
  class selectableList extends Component {
    constructor(props){
      super(props)
      this.handleRequestChange = this.handleRequestChange.bind(this)
    }

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

  selectableList.propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number,
    }

    return selectableList
}

const SelectableList = wrapState(makeSelectable(List))  // eslint-disable-line new-cap

export default SelectableList
