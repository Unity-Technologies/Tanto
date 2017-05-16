/* flow */

import React from 'react'
import { connect } from 'react-redux'
import { getChangelog } from 'ducks/repositories/selectors'
import ChangesetList from 'components/ChangesetList'
import PureComponent from 'components/PureComponent'

export type Props = {
  params: Object,
  branch: string,
  repoName: string,
  commits: Array<any>
};

class RepoChangelog extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.commits
  // }

  onSelectedChangesetsChange = (e, selectedChangesNumber) => {
    this.setState({ enabled: selectedChangesNumber in [2, 1] })
  }

  props: Props

  render() {
    const { commits, repoName } = this.props

    return (
      <ChangesetList
        disa
        showCheckboxes
        commits={commits}
        projectName={repoName}
        onSelectedChangesetsChange={this.onSelectedChangesetsChange}
      />
    )
  }
}

export default connect((state, props) => ({
  commits: getChangelog(state, props),
}))(RepoChangelog)
