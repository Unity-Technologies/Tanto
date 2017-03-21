// TODO: add flow annotations

import React, { Component } from 'react'
import BranchSelect from 'components/BranchSelect'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import { fetchChangelog } from 'ducks/repositories/actions'
import { getChangelog } from 'ducks/repositories/selectors'
import ChangesetList from 'components/ChangesetList'
import LoadingComponent from 'components/LoadingComponent'


export type Props = {
  params: Object,
  data: Array<any>,
};

class Changelog extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      height: '100%',
      autoHideDuration: 4000,
      message: 'Hash has been copied to clipboard',
      open: false,
    }
    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleActionTouchTap = this.handleActionTouchTap.bind(this)
    this.handleChangeDuration = this.handleChangeDuration.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  componentDidMount() {
    if (this.props.params.splat) {
      this.props.dispatch(fetchChangelog(this.props.params.splat))
    }
  }

  props: Props

  handleTouchTap() {
    this.setState({
      open: true,
    })
  }

  handleActionTouchTap() {
    this.setState({
      open: false,
    })
  }

  handleChangeDuration(event) {
    const value = event.target.value
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value, 10) : 0,
    })
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    const showChangesButtonStyle = {
      backgroundColor: '#1fb5ad',
      borderColor: '#1fb5ad',
      color: 'white',
    }

    const openPrButtonStyle = {
      backgroundColor: 'rgb(162, 162, 171)',
      borderColor: 'rgb(162, 162, 171)',
      color: 'white',
    }

    const { params: { id }, data } = this.props

    return (
      <div>
        <div style={{ padding: '10px' }}>
          <Row>
            <Col md={4}>
              <div
                style={{
                  display: 'inline-flex',
                  border: '1px solid lightgrey',
                  borderRadius: '5px',
                  padding: '7px',
                  width: '100%',
                  backgroundColor: 'white' }}
              >
                <span
                  style={{ pagging: '10px', color: 'grey' }}
                >
                  <i className="fa fa-search" aria-hidden="true" />
                </span>
                <input
                  type="text"
                  style={{
                    outline: 'none',
                    border: 'none',
                    marginLeft: '10px',
                    fontSize: '14px',
                    width: '100%' }}
                />

              </div>
            </Col>

            <Col md={4}>
              <BranchSelect project={id} placeholder="Select branch ..." />
            </Col>


            <Col md={4}>
              <ButtonGroup style={{ float: 'right' }}>
                <Button style={showChangesButtonStyle}>
                  Show
                </Button>
                <Button style={openPrButtonStyle}>
                  Open Pull
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
        <LoadingComponent status={status}>
        {!status.isFetching && !data && !status.error &&
          <div style={{ textAlign: 'center', padding: '10%' }} >
            <h4>NO CHANGES</h4>
          </div>
          }
          <ChangesetList commits={data} projectName={this.props.params.splat} />
        </LoadingComponent>
      </div>
    )
  }
}

export default connect(getChangelog)(Changelog)
