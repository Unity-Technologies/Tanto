import React from 'react'
import { default as RichTextEditorArea } from 'react-rte'
import PureComponent from 'components/PureComponent'
import Button from 'react-bootstrap/lib/Button'
import './styles.css'

type Props = {
  onCancel: Function,
  onSave: Function,
  text: string,
  showCancel: boolean,
  readMode: boolean,
  cancelButtonTitle: string,
  saveButtonTitle: string,
}

class RichTextEditor extends PureComponent {
  constructor(props: Props) {
    super(props)

    this.state = {
      value: this.getEditorInitialText(props),
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.text !== this.props.text && nextprops.text) {
      this.setState({
        value: RichTextEditorArea.createValueFromString(nextprops.text, 'markdown'),
      })
    }
  }

  getEditorInitialText = props => (props.text ?
    RichTextEditorArea.createValueFromString(this.props.text, 'markdown') :
    RichTextEditorArea.createEmptyValue())

  props: Props

  handleOnChange = (value) => {
    this.setState({ value })
  }

  handleOnCancel = () => {
    this.setState({
      value: this.getEditorInitialText(this.props),
    })
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  handleOnSave = () => {
    this.setState({
      value: this.getEditorInitialText(this.props),
    })
    if (this.props.onSave) {
      const text = this.state.value.toString('markdown')
      this.props.onSave(text)
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
              {this.props.showCancel &&
                <Button
                  onClick={this.handleOnCancel}
                  style={{ marginRight: '5px' }}
                >
                  {this.props.cancelButtonTitle || 'Cancel'}
                </Button>
              }
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
