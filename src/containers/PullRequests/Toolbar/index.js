import React, { Component } from 'react'

// import Filter from 'components/Filter'
// import BranchSelect from 'components/BranchSelect'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Select from 'react-select'
import { connect } from 'react-redux'
import { searchRepository } from 'ducks/repositories'
import { isSearchingRepository, searchRepositoryError } from 'ducks/repositories/selectors'

// const sort = [
//   { value: 1, label: 'Creation date' },
//   { value: 2, label: 'Last update date' },
//   { value: 3, label: 'Changes size' },
//   { value: 4, label: 'Comments number' },
//   { value: 5, label: 'Builds count' },
//   { value: 6, label: 'Reviewers count' },
//   { value: 7, label: 'Versions count' },
// ]

// export const branches = [
//   { value: 1, label: 'default' },
//   { value: 2, label: '5.3/devs/default' },
//   { value: 3, label: '5.3/devs/feature1/feature' },
//   { value: 4, label: '5.3/devs/feature2' },
//   { value: 5, label: '5.3/devs/feature3' },
//   { value: 6, label: '5.3/devs/feature4' },
// ]

type Props = {
  isSearching: boolean,
  repositoriesNames: Array<string>
}

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = { options: [] }
  }
  props: Props

  onChange = (value) => {
    this.props.dispatch(searchRepository(`%${value}%`, 5))
  }

  componentWillReceiveProps(nextProp: any) {
    this.setState({
      options: nextProp.repositoriesNames.map(x => ({ label: x, value: x })),
    })
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#f8f8f8',
          padding: '10px',
        }}
      >
        <Row>
          <Col md={4}>
            <Select
              name="repository"
              value="one"
              options={this.state.options}
              onInputChange={this.onChange}
              placeholder="filter by repository"
              isLoading={this.props.isSearching}
            />
          </Col>

          <Col md={4}>
            {/* <BranchSelect branches={[]} placeholder="Select branch ..." />*/}
          </Col>

          <Col md={4}>
            <div style={{ float: 'left', marginRight: '5px' }}>
              {/* <Filter data={[]} placeholder="Order by..." />*/}
            </div>
            <div style={{ float: 'left', marginRight: '5px' }}>
              <a
                className="btn"
                style={{
                  color: 'white',
                  backgroundColor: '#b9ebae',
                }} aria-label="Sort ascending"
              >
                <i className="fa fa-sort-amount-asc" aria-hidden="true" />
              </a>
            </div>
            <div style={{ float: 'left' }}>
              <a
                className="btn"
                style={{
                  color: 'white',
                  backgroundColor: 'lightgrey',
                }} aria-label="Sort descending"
              >
                <i className="fa fa-sort-amount-desc" aria-hidden="true" />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  state => ({
    isFetching: isSearchingRepository(state),
    error: searchRepositoryError(state),
    repositoriesNames: state.repositories.names,
  })
)(Toolbar)
