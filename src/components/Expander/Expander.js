// TODO: add flow annotations
/* eslint-disable */

import React, { Component } from 'react'
import './Expander.css'

class Expander extends Component {
  constructor(props) {
    super(props)
    this.state = { collapsed: true }
    this.expandHandler = this.expandHandler.bind(this)
  }

  expandHandler() {
    const state = this.state.collapsed
    this.setState({ collapsed: !state })
  }

  render() {
    return (
      <div>
        {!this.state.collapsed &&
          this.props.children
        }
        <div className="expander" onClick={this.expandHandler}>
          <i className={`fa ${this.state.collapsed ? 'fa-expand' : 'fa-compress'}`} />
        </div>
      </div>
    )
  }
}

export default Expander
