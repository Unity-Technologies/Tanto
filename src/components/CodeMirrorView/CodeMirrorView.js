// TODO: add flow annotations

/* eslint-disable */

import React, { Component } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'

import 'codemirror/lib/codemirror.css'
import './CodeMirrorView.css'

export type Props = {
  value?: string,
  options?: Object,
};

class CodeMirrorView extends Component {
  props: Props

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

export default CodeMirrorView
