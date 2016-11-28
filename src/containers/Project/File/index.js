/* @flow */

import React, { PropTypes, Component } from 'react'
import Helmet from 'react-helmet'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { Sticky, StickyContainer } from 'react-sticky'
import { Col, Row, Panel } from 'react-bootstrap'
import {
  CodeMirrorView,
  BranchSelect,
  ReduxBreadcrumb,
  Filter,
  NewComment,
  Comment,
} from 'components'
import { changesets } from '../../../api/testData'


class File extends Component {
  constructor(props) {
    super(props)
    this.state = { code: props.file, comments: [] }
    this.onSaveComment = this.onSaveComment.bind(this)
  }

  onSaveComment(message) {
    const comments = this.state.comments
    comments.push({
      id: _.uniqueId(),
      message,
      postDate: moment().startOf('hour').fromNow(),
      author: this.props.author,
    })
    this.setState({
      comments,
    })
  }

  // on(newCode) {
  //   this.setState({
  //     code: newCode,
  //   })
  // }

  render() {
    const value = `// This function tries to parse a single expression at a given
    // offset in a string. Useful for parsing mixed-language formats
    // that embed JavaScript expressions.

    export function parseExpressionAt(input, pos, options) {
      let p = new Parser(options, input, pos)
      p.nextToken()
      return p.parseExpression()
    }`

    const options = {
      readOnly: true,
      lineNumbers: true,
      style: { border: '1px solid black' },
      textAreaClassName: ['form-control'],
      textAreaStyle: { minHeight: '10em', fontSize: '14px' },
      theme: 'solarized',
      mode: 'javascript',
      matchBrackets: true,
    }

    const metadata = {
      name: 'filename.py',
      linesCount: 5,
      size: '100Kb',
      author: 'kate',
      hash: 'dd00475c4523',
      commitMessage: 'Some test commit message',
    }

    const { params: { id } } = this.props
    return (
      <div>
        <Helmet title="File" />
        <StickyContainer>
          <Sticky
            style={{
              zIndex: 1030,
              backgroundColor: '#f8f8f8',
              marginBottom: '20px',
              border: '1px solid rgb(226, 226, 226)',
              borderRadius: '4px',
            }}
          >
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


                <Col md={7} >
                  <div style={{ display: 'inline-flex' }}>
                    <div style={{ width: '270px', marginRight: '5px' }}><BranchSelect project={id} placeholder="Select branch ..." /></div>
                    <Filter data={changesets} placeholder="Select changeset..." />
                  </div>
                </Col>

                <Col md={1}>
                  <div style={{ float: 'right' }}><a
                    className="btn"
                    style={{
                      color: 'white',
                      backgroundColor: '#3dc5a0' }} aria-label="Download"
                  >
                    <i className="fa fa-download" aria-hidden="true" />
                  </a></div>
                </Col>
              </Row>
            </div>

          </Sticky>

          <div>
            <ReduxBreadcrumb />
          </div>

          <Panel
            header={
              <div style={{ display: 'inline-block', width: '100%', textDecoration: 'none' }}>
                <div style={{ fontSize: '14px' }}><strong>{metadata.name}</strong>
                  <span style={{ color: 'rgb(122, 123, 123)', fontSize: '13px', padding: '10px', float: 'right' }}>size: {metadata.size}</span></div>
                <div style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', fontStyle: 'italic' }}><strong>{metadata.author}</strong> modified 3 days ago
                </div>
              </div>
        }
          >
            <CodeMirrorView fill value={value} options={options} />
          </Panel>


          <div>
            <h4>{this.state.comments.length} comments</h4>
            {this.state.comments.map(comment => (
              <div style={{ marginTop: '10px' }}>
                <Comment
                  simpleText={false}
                  key={_.uniqueId('_code_comment')}
                  {...comment}
                />
              </div>
          ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <NewComment
              ref={c => (this.newTextEditorBox = c)}
              placeholder="Write comment here..."
              onComment={message => this.onSaveComment(message)}
            />
          </div>
        </StickyContainer>
      </div>
    )
  }
}

File.propTypes = {
  params: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
 // dispatch: PropTypes.func,
  author: PropTypes.string.isRequired,
 // theme: PropTypes.object,
}

export default connect(state => ({
  file: state.projects.file || null,
}))(File)
