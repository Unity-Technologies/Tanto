/* @flow */

import React, { Component } from 'react'

import './Checkbox.css'

export type Props = {
  checked: boolean,
  value: any,
  onCheck?: (e: SyntheticInputEvent, value: boolean) => any,
  name: string,
  disabled?: boolean,
}

class Checkbox extends Component {
  /* eslint-disable react/sort-comp */
  constructor(props: Props) {
    super(props);
    (this:any).handleClick = this.handleClick.bind(this)
  }

  props: Props

  handleClick(e: SyntheticInputEvent) {
    if (this.props.onCheck) {
      this.props.onCheck(e, e.target.checked)
    }
  }

  // TODO: apply material-ui  styling here
  render() {
    const { value, checked, disabled, name } = this.props
    return (
      <div>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={this.handleClick}
          className="checkbox-box"
        />
        <label htmlFor={name} />
      </div>
    )
  }
}

export default Checkbox
