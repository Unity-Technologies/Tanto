/* @flow */

import React, { Component } from 'react'

import Select from 'react-select'
import { connect } from 'react-redux'
import { searchRepository, fetchRepositoryBranches } from 'ducks/repositories'
import { isSearchingRepository, searchRepositoryError } from 'ducks/repositories/selectors'

type SelectItemType = {
  label: string,
  value: string,
}

type RepoProps = {
  options: Array<SelectItemType>,
  onSelect: Function,
}

class RepoSelect extends Component {
  constructor(props: RepoProps) {
    super(props)
    this.state = { options: [], repo: {} }
  }

  componentWillReceiveProps(nextProp: any): void {
    this.setState({
      options: nextProp.options.map(x => ({ label: x.fullName, value: x.id })),
    })
  }

  handleRepoInputChange = (value): void => {
    this.props.dispatch(searchRepository(`%${value}%`, 5))
  }

  handleRepoChange = (repo: SelectItemType): void => {
    this.setState({ repo })
    this.props.dispatch(fetchRepositoryBranches(repo.value))
    if (this.props.onSelect) {
      this.props.onSelect(repo.value)
    }
  }

  props: RepoProps

  render() {
    return (
      <Select
        value={this.state.repo}
        name="repository"
        options={this.state.options}
        onChange={this.handleRepoChange}
        onInputChange={this.handleRepoInputChange}
        placeholder="repository ..."
        isLoading={this.props.isFetching}
      />
    )
  }
}

export default connect(
  state => ({
    isFetching: isSearchingRepository(state),
    error: searchRepositoryError(state),
    options: state.repositories.names,
  })
)(RepoSelect)
