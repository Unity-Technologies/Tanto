/* @flow */

/* eslint-disable */

import React, { PropTypes, Component } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'

import 'codemirror/lib/codemirror.css'
import './CodeMirrorView.css'

class CodeMirrorView extends Component {

  componentDidMount() {
    const textarea = this.codeMirrorTextArea
    this.codeMirror = CodeMirror.fromTextArea(textarea, this.props.options)
    this.codeMirror.setValue(this.props.value || '')
  }

  componentDidUpdate() {
    if (this.editor) {
      if (this.props.value != null) {
        if (this.editor.getValue() !== this.props.value) {
          this.editor.setValue(this.props.value)
        }
      }
    }
  }

  render() {
    const { value } = this.props

    return (
      <textarea
        style={{ zIndex: '-1' }}
        ref={c => (this.codeMirrorTextArea = c)}
        autoComplete="off"
        defaultValue={value}
      />
    )
  }
}

CodeMirrorView.propTypes = {
  value: PropTypes.string,
  options: PropTypes.object,
}

export default CodeMirrorView
