// TODO: add flow annotations

import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import TextEditorBox from '../TextEditorBox'

export type Props = {
  onCancel?: Function,
  onComment?: Function,
  style?: Object,
  author: string,
  headerStyle?: Object,
}

class NewComment extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      commentText: '',
    }
    this.handleCommentCancel = this.handleCommentCancel.bind(this)
    this.handleCommentSave = this.handleCommentSave.bind(this)
  }

  props: Props

  handleCommentCancel() {
    this.setState({ commentText: '' })
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  handleCommentSave() {
    this.newTextEditorBox.onClear()
    if (this.props.onComment) {
      this.props.onComment(this.state.commentText)
    }
  }

  render() {
    const { style, headerStyle, author } = this.props
    const defaultCommentStyle = {
      border: '2px solid #d9edf7',
      borderRadius: '10px 10px 10px 10px',
      marginBottom: '10px',
      padding: '10px',
      ...style,
    }

    return (
      <div>
        <div style={style || defaultCommentStyle}>
          <TextEditorBox
            author={author}
            onTextChanged={(message) => { this.state.commentText = message }}
            ref={tb => (this.newTextEditorBox = tb)}
            styleControlsStyle={headerStyle || { borderRadius: '10px 10px 0 0' }}
            placeholder="Write comment here..."
          />
        </div>
        <RaisedButton
          label="Comment"
          backgroundColor="#d9edf7"
          style={{ marginRight: '10px' }}
          onClick={() => this.handleCommentSave()}
        />
        <RaisedButton
          label="Cancel"
          backgroundColor="#efefef"
          onClick={() => this.handleCommentCancel()}
        />
      </div>
    )
  }
}

export default NewComment
