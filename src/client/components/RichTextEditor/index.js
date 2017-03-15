import React, { Component } from 'react'
import { default as RichTextEditorArea } from 'react-rte'
import Button from 'react-bootstrap/lib/Button'

type Props = {
  onChange: Function,
  onCancel: Function,
  onSave: Function,
  readMode: boolean,
  cancelButtonTitle: string,
  saveButtonTitle: string,
}

class RichTextEditor extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      value: this.getEditorInitialText(),
    }
  }

  props: Props

  handleOnChange = (value) => {
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('markdown')
      )
    }
  }

  getEditorInitialText = () => (this.props.text ?
    RichTextEditorArea.createValueFromString(this.props.text, 'markdown') :
    RichTextEditorArea.createEmptyValue())

  handleOnCancel = () => {
    this.setState({
      value: this.getEditorInitialText(),
    })
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  handleOnSave = () => {
    if (this.props.onSave) {
      this.props.onSave(
        this.state.value.toString('markdown')
      )
    }
  }

  render() {
    return (
      <div>
        <RichTextEditorArea
          value={this.state.value}
          readOnly={this.props.readMode}
          onChange={this.handleOnChange}
        />
        {!this.props.readMode &&
          <div style={{ display: 'inline-block', width: '100%' }}>
            <div style={{ marginTop: '5px', float: 'right' }}>
              <Button
                onClick={this.handleOnCancel}
                style={{ marginRight: '5px' }}
              >
                {this.props.cancelButtonTitle || 'Cancel'}
              </Button>
              <Button
                onClick={this.handleOnSave}
                bsStyle="success"
              >
                {this.props.saveButtonTitle || 'Save'}
              </Button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default RichTextEditor
