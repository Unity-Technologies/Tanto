// TODO: add flow annotations

import React, { PropTypes, Component } from 'react'
import Helmet from 'react-helmet'
import { BranchSelect, TextEditorBox, UserFilter, CodeDiffView } from 'components'
import FlatButton from 'material-ui/FlatButton'
import { Nav, NavItem, Navbar, Row, Col } from 'react-bootstrap'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { reviewers as reviewersTestData } from '../../../api/testData'
import { NewPullRequestData } from '../../../api/testPullRequest'

class NewPullRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: 'default',
      to: '',
      title: '',
      description: '',
      reviewers: [],
      pullRequest: null,
    }
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  handleFromChange(value) {
    this.setState({ from: value })
  }

  handleToChange(value) {
    this.setState({ to: value })
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    })
  }

  render() {
    const { theme, params: { id } } = this.props
    const titleStyle = { fontSize: '18px', marginTop: '15px' }
    const rowStyle = { paddingTop: '10px' }
    return (
      <div>
        <Helmet title="New pull request" />
        <Navbar style={theme.componentStyles.navbarStyle} fluid>
          <Nav>
            <NavItem>
              <span style={{ position: 'absolute', marginLeft: '-30px', paddingTop: '5px' }}>
                <i className="fa fa-code-fork fa-2x" aria-hidden="true" />
              </span>
              <BranchSelect
                prefix="base:"
                project={id}
                placeholder="Select base branch ..."
                value={this.state.from}
                onChange={this.handleFromChange}
              />
            </NavItem>
            <NavItem>
              <BranchSelect
                prefix="base:"
                project={id}
                placeholder="Select target branch ..."
                value={this.state.to}
                onChange={this.handleToChange}
              />
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <FlatButton
                label="Save pull request"
                primary
                style={{ backgroundColor: '#efefef' }}
              />
            </NavItem>
          </Nav>
        </Navbar>

        <TextField
          style={titleStyle}
          id="pr-title"
          value={this.state.title}
          onChange={this.handleTitleChange}
          fullWidth
          hintText="New pull request title"
        />
        <Row style={rowStyle}>
          <Col md={12}>
            <TextEditorBox
              style={{ border: '1px solid lightgrey' }}
              placeholder="Pull request description"
            />
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col md={12}>
            <UserFilter
              project={id}
              placeholder="Select reviewers ...."
            />
          </Col>
        </Row>

        {this.state.to && this.state.from &&
          <Row>
            <Col md={12}>
              <h4>Changeset</h4>
              <CodeDiffView files={NewPullRequestData} />
            </Col>
          </Row>
        }
      </div>
    )
  }
}

NewPullRequest.propTypes = {
  params: PropTypes.object,
  theme: PropTypes.object,
  // reviewers: PropTypes.array,
}

export default connect(state => ({ // eslint-disable-line no-unused-vars
  reviewers: reviewersTestData,
}))(NewPullRequest)
