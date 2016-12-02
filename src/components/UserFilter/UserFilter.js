import React, { PropTypes, Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { reviewers } from '../../api/testData'

class UserFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: reviewers,
      value: props.defaultValue || [],
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

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

UserFilter.propTypes = {
  // project: PropTypes.string.isRequired,
  defaultValue: PropTypes.array,
  // style: PropTypes.object,
  // onChange: PropTypes.func,
  // width: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

export default UserFilter
