// TODO: add flow annotations

import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { reviewers } from '../../api/testData'

export type Props = {
  defaultValue?: // project: PropTypes.string.isRequired,
  Array<any>,
  placeholder?: // style: PropTypes.object,
  // onChange: PropTypes.func,
  // width: PropTypes.string,
  string,
  disabled?: boolean,
};

class UserFilter extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      options: reviewers,
      value: props.defaultValue || [],
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  props: Props

  handleSelectChange(value) {
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
