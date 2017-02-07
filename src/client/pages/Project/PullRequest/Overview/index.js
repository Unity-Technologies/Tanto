// TODO: add flow annotations

import React, { Component } from 'react'
import TextEditorBox from 'components/TextEditorBox'
import Label from 'components/Label'
import Comment from 'components/Comment'
import { getLoggedUsername } from 'ducks/session/selectors'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import moment from 'moment'
import TextField from 'material-ui/TextField'
import _ from 'lodash'
import { connect } from 'react-redux'

export type Props = {
  id: string,
  user?: string,
  data?: Object,
  commentAuthor?: string,
}

class Overview extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { pullRequest: props.data, comments: [], changed: false }
  }

  onSaveComment(message) {
    const comments = this.state.comments
    comments.push({
      id: _.uniqueId(),
      message,
      postDate: moment().startOf('hour').fromNow(),
      author: this.props.commentAuthor,
    })

    this.setState({
      comments,
      changed: true,
    })

    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  props: Props

  handleTitleChange(event) {
    const pullRequest = this.state.pullRequest
    pullRequest.title = event.target.value
    this.setState({
      pullRequest,
      changed: true,
    })
  }

  render() {
    const { user } = this.props
    const titleStyle = { fontSize: '18px', marginTop: '15px' }
    const rowStyle = { paddingTop: '10px' }
    const owner = user === this.state.pullRequest.author
    return (
      <div style={{ padding: '0 15px' }}>
        {!owner &&
          <div style={titleStyle}>{this.state.pullRequest.title}</div>
        }
        {owner &&
          <TextField
            style={titleStyle}
            id="pr-title"
            value={this.state.pullRequest.title}
            underlineDisabledStyle={{ display: 'none', borderColor: 'transparent' }}
            multiLine
            rowsMax={2}
            onChange={this.handleTitleChange}
            fullWidth
            hintText="New pull request title"
          />
        }
        <div style={{ padding: '20px 0', fontSize: '14px' }}>
          <span style={{ paddingRight: '10px' }}>
            <strong>{this.state.pullRequest.author}</strong> wants to merge it from</span>
          <Label prefix="base:" text={this.state.pullRequest.from} />
          <span style={{ padding: '0px 10px' }}>to</span>
          <Label prefix="target:" text={this.state.pullRequest.to} />
        </div>
        <TextEditorBox
          text={this.state.pullRequest.description}
          readOnly={!owner}
          style={{ border: '1px solid lightgrey' }}
          previewMode
          simpleText
        />
        <Row style={rowStyle}>
          <Col md={12}>
            <div style={{ padding: '10px 0', fontSize: '16px' }}>
              <strong>Reviewers:</strong>
            </div>

          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div>
              {this.state.comments.map(comment => (
                <div style={{ marginTop: '10px' }}>
                  <Comment
                    style={{ border: '1px solid lightgrey',
                      borderRadius: '0px',
                      marginBottom: '10px' }}
                    simpleText={false}
                    hideSettings
                    key={_.uniqueId('_code_comment')}
                    {...comment}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px' }}>
              <Comment
                loggedUsername={this.props.commentAuthor}
                newComment
                headerStyle={{ borderRadius: '0px' }}
                style={{ border: '1px solid lightgrey',
                  borderRadius: '0px',
                  marginBottom: '10px' }}
                ref={tb => (this.newTextEditorBox = tb)}
                placeholder="Write comment here..."
                onComment={message => this.onSaveComment(message)}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => ({
  commentAuthor: getLoggedUsername(state),
}))(Overview)
