/* @flow */

import Select from 'react-select'
import React, { Component } from 'react'
import 'react-select/dist/react-select.css'

export type Props = {
  placeholder?: string,
  data: Array<{ value: string, label: string }>,
  onChange?: Function,
};

class Filter extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { value: null };
    (this:any).handleChange = this.handleChange.bind(this)
  }

  state: {
    value: ?string,
  };

  props: Props

  handleChange(r: string) {
    this.setState({
      value: r,
    })
    if (this.props.onChange) {
      this.props.onChange(r)
    }
  }

  render() {
    return (
      <div style={{ width: '170px' }}>
        <Select
          name="form-field-name"
          placeholder={this.props.placeholder}
          value={this.state.value}
          options={this.props.data}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Filter
