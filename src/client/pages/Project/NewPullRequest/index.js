// TODO: add flow annotations

import React, { Component } from 'react'
import Helmet from 'react-helmet'

import TextEditorBox from 'components/TextEditorBox'
import BranchSelect from 'components/BranchSelect'
// import CodeDiffView from 'components/CodeDiffView'

import FlatButton from 'material-ui/FlatButton'

import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'

import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'


export type Props = {
  params?: Object,
  theme?: // reviewers: PropTypes.array,
  Object,
};

class NewPullRequest extends Component {
  constructor(props: Props) {
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

  props: Props

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

          </Col>
        </Row>

        {this.state.to && this.state.from &&
          <Row>
            <Col md={12}>
              <h4>Changeset</h4>

            </Col>
          </Row>
        }
      </div>
    )
  }
}

export default connect(state => ({ // eslint-disable-line no-unused-vars
  reviewers: [],
}))(NewPullRequest)
