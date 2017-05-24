/* @flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import { default as Select } from 'components/VirtualizedSelect'
import { connect } from 'react-redux'
import { fetchRepositoryBranches } from 'ducks/repositories/actions'
import { getData } from './selectors'

type SelectItemType = {
  label: string,
  value: string,
}

type BranchProps = {
  repoName: string,
  options: Array<SelectItemType>,
  onSelect: Function,
  style: ?Object,
  dispatch: Function,
}

class BranchSelect extends PureComponent {
  constructor(props: BranchProps) {
    super(props)
    this.state = { branch: null }
  }

  state: {
    branch: ?SelectItemType,
  }

  componentDidMount() {
    // TODO : enable search instead of fetching all branches

    if (this.props.repoName) {
      this.props.dispatch(fetchRepositoryBranches(this.props.repoName))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.repoName !== nextProps.repoName) {
      this.props.dispatch(fetchRepositoryBranches(nextProps.repoName))
    }
  }

  props: BranchProps

  handleBranchChange = (branch: SelectItemType): void => {
    this.setState({ branch })
    if (this.props.onSelect) {
      this.props.onSelect(branch ? branch.value : '')
    }
  }

  render() {
    return (
      <Select
        style={this.props.style}
        value={this.state.branch}
        name="branch"
        options={this.props.options}
        onChange={this.handleBranchChange}
        placeholder="branch ..."
      />
    )
  }
}

export default connect(getData)(BranchSelect)
