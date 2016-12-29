/* @flow */

import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { repoBranchesSelector } from 'ducks/repositories/selectors'

type SelectItemType = {
  label: string,
  value: string,
}

type BranchProps = {
  repoId: number,
  options: Array<SelectItemType>,
  onSelect: Function,
}

class BranchSelect extends Component {
  constructor(props: BranchProps) {
    super(props)
    this.state = { branch: '' }
  }

  componentWillReceiveProps(nextProp: any): void {
    this.setState({
      options: nextProp.options.map(x => ({ label: x.name, value: x.revision })),
    })
  }

  handleBranchChange = (branch: SelectItemType): void => {
    this.setState({ branch })
    if (this.props.onSelect) {
      this.props.onSelect(branch.value)
    }
  }

  props: BranchProps

  render() {
    return (
      <Select
        value={this.state.branch}
        name="branch"
        options={this.state.options}
        onChange={this.handleBranchChange}
        placeholder="branch ..."
      />
    )
  }
}

export default connect(
  (state, props) => ({
    options: repoBranchesSelector(state, props),
  })
)(BranchSelect)
