/* @flow */

import React, { Component } from 'react'

import Select from 'react-select'
import { connect } from 'react-redux'
import { searchRepository } from 'ducks/repositories'
import { isSearchingRepository, searchRepositoryError, repositoriesNames } from 'ducks/repositories/selectors'

type SelectItemType = {
  label: string,
  value: string,
}

type RepoProps = {
  options: Array<SelectItemType>,
  onSelect: Function,
  dispatch: Function,
  isFetching: boolean,
  style: ?Object,
}

class RepoSelect extends Component {
  constructor(props: RepoProps) {
    super(props)
    this.state = { repo: null }
  }

  handleRepoInputChange = (value): void => {
    if (value) {
      this.props.dispatch(searchRepository(`%${value}%`, 5))
    }
  }

  handleRepoChange = (repo: SelectItemType): void => {
    this.setState({ repo })
    const repoId = repo ? repo.value : ''
    if (this.props.onSelect) {
      this.props.onSelect(repoId)
    }
  }

  props: RepoProps
  state: {
    repo: ?SelectItemType,
  }

  render() {
    return (
      <Select
        style={this.props.style}
        value={this.state.repo}
        name="repository"
        options={this.props.options}
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
    options: repositoriesNames(state),
  })
)(RepoSelect)
