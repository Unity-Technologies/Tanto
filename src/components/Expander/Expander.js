/* @flow */
import React, { Component } from 'react'
import './Expander.css'

type Props = {
  children?: Element<any>
}

class Expander extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: Props) {
    super(props)
    this.state = { collapsed: true };

    (this:any).expandHandler = this.expandHandler.bind(this)
  }

  props : Props

  state : {
    collapsed: boolean,
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
