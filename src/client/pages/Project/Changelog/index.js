/* flow */

import React, { PureComponent } from 'react'
import BranchSelect from 'components/BranchSelect'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import { fetchChangelog } from 'ducks/repositories/actions'
import { getChangelog, getChangelogFetchStatus } from 'ducks/repositories/selectors'
import ChangesetList from 'components/ChangesetList'
import LoadingComponent from 'components/LoadingComponent'
import _ from 'lodash'
import './Changelog.css'

export type Props = {
  params: Object,
  data: Array<any>
};

class Changelog extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = {
      enabled: false,
    }
  }

  componentDidMount() {
    if (this.props.params.splat) {
      this.props.dispatch(fetchChangelog(this.props.params.splat))
    }
  }

  onSelectedChangesetsChange = (e, selectedChangesNumber) => {
    this.setState({ enabled: selectedChangesNumber in [2, 1] })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data || this.state.disabled !== nextState.disabled || !_.isEqual(nextProps.status, this.props.status)
  }

  props : Props

  render() {
    const { params: { id }, data, status } = this.props

    return (
      <div>
        <div className="changelog-list">
          <Row>
            <Col md={4}>
              <BranchSelect project={id} placeholder="Select branch ..." />
            </Col>

            <Col md={8}>
              <Button disabled={this.state.enabled} className="changelog-btn">
                Show changeset
              </Button>
            </Col>
          </Row>
        </div>
        <LoadingComponent status={status}>
          <ChangesetList
            showCheckboxes
            commits={data}
            projectName={this.props.params.splat}
            onSelectedChangesetsChange={this.onSelectedChangesetsChange}
          />
        </LoadingComponent>
      </div>
    )
  }
}

export default connect((state, props) => ({
  status: getChangelogFetchStatus(state, props),
  data: getChangelog(state, props),
}))(Changelog)
