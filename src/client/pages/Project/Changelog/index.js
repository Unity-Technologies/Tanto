/* flow */

import React from 'react'
import BranchSelect from 'containers/BranchSelect'
import PureComponent from 'components/PureComponent'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import { fetchChangelog } from 'ducks/repositories/actions'
import { getChangelogFetchStatus } from 'ducks/repositories/selectors'
import RepoChangelog from 'containers/RepoChangelog'
import LoadingComponent from 'components/LoadingComponent'

import './Changelog.css'

export type Props = {
  params: Object,
  repoName: string,
};

class Changelog extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = {
      enabled: false,
      branch: '',
    }
  }

  componentDidMount() {
    if (this.props.repoName) {
      this.props.dispatch(fetchChangelog(this.props.repoName, this.state.branch))
    }
  }

  onSelectedChangesetsChange = (e, selectedChangesNumber) => {
    this.setState({ enabled: selectedChangesNumber in [2, 1] })
  }


  handleBranchSelect = (branch: string): void => {
    if (branch !== this.state.branch) {
      this.setState({ branch })
      this.props.dispatch(fetchChangelog(this.props.repoName, this.state.branch))
    }
  }

  props: Props

  render() {
    const { repoName, status } = this.props

    return (
      <div>
        <div className="changelog-list">
          <Row>
            <Col md={4}>
              <BranchSelect
                repoName={repoName}
                onSelect={this.handleBranchSelect} placeholder="Select branch ..."
              />
            </Col>

            <Col md={8}>
              <Button disabled={this.state.enabled} className="changelog-btn">
                Show changeset
              </Button>
            </Col>
          </Row>
        </div>
        <LoadingComponent status={status}>
          <RepoChangelog branch={this.state.branch} repoName={repoName} />
        </LoadingComponent>
      </div>
    )
  }
}

export default connect((state, props) => ({
  status: getChangelogFetchStatus(state, props),
  repoName: props.params.splat,
}))(Changelog)
