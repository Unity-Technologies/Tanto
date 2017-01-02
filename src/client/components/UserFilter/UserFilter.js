/* @flow */

import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { reviewers } from '../../api/testData'

export type Props = {
  defaultValue?: Array<any>,
  placeholder?: string,
  disabled?: boolean,
};

class UserFilter extends Component {
  /* eslint-disable react/sort-comp */
  constructor(props: Props) {
    super(props)
    this.state = {
      options: reviewers,
      value: props.defaultValue || [],
    };

    (this:any).handleSelectChange = this.handleSelectChange.bind(this)
  }

  props: Props

  state: {
    options: Array<{ value: string, label: string }>,
    value: any,
  }

  handleSelectChange(value: any) {
    this.setState({ value })
  }

  render() {
    const { placeholder, disabled } = this.props
    return (
      <div className="section">
        <Select
          multi
          simpleValue
          disabled={disabled}
          value={this.state.value}
          placeholder={placeholder}
          options={this.state.options}
          onChange={this.handleSelectChange}
        />
      </div>
    )
  }
}

export default UserFilter
