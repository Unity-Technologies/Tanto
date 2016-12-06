/* eslint-disable */

import React, { Component, PropTypes } from 'react'
import './Expander.css'

export type Props = { children: number | string | React.Element | Array<any> };

class Expander extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { collapsed: true }
    this.expandHandler = this.expandHandler.bind(this)
  }

  props: Props;

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
