// TODO: add flow annotations

import React, { Component } from 'react'
import { EditorState, RichUtils, ContentState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import importer from 'draft-js-ast-importer'
import 'draft-js-mention-plugin/lib/plugin.css'
import 'draft-js-emoji-plugin/lib/plugin.css'

import Avatar from 'components/Avatar'
import './TextEditorBox.css'
import StyleControls from './StyleControls'

const mentionPlugin = createMentionPlugin()
const { MentionSuggestions } = mentionPlugin

const emojiPlugin = createEmojiPlugin()
const { EmojiSuggestions } = emojiPlugin

const plugins = [emojiPlugin, mentionPlugin]

export type Props = {
  mentions?: Array<any>,
  onTextChanged?: Function,
  readOnly?: boolean,
  text?: any,
  placeholder?: // height: PropTypes.string,
  string,
  hideStyleControls?: boolean,
  simpleText?: boolean,
  children?: number | string | React.Element | Array<any>,
  header?: number | string | React.Element | Array<any>,
  style?: Object,
  editorStyle?: Object,
  styleControlsStyle?: Object,
};

class TextEditorBox extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: Props) {
    super(props)

    this.state = {
      editorState: props.text ?
        EditorState.createWithContent(
          props.simpleText ? ContentState.createFromText(props.text) : importer(props.text)
        ) : EditorState.createEmpty(),
      mentions: props.mentions || [],
      suggestions: [],
    }
  }

  props: Props

  onChange = (editorState) => {
    this.setState({
      editorState,
    })
    if (this.props.onTextChanged) {
      this.props.onTextChanged(this.state.editorState.getCurrentContent().getPlainText())
    }
  }

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, this.state.suggestions),
    })
  }

  onToogleEditMode = () => {
    this.setState({
      readOnly: true,
    })
  }

  onClear = () => {
    this.setState({
      editorState: EditorState.createEmpty(),
    })
  }

  onToogleInlineStyle = (style) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
  }

  onToogleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  focus = () => this.editor.focus()

  render() {
    const {
      readOnly,
      placeholder,
     // style,
      editorStyle,
      author,
      styleControlsStyle,
    } = this.props
    return (
      <div
        className="RichEditor-root"
        style={{ border: '1px solid #e4e3e3' }}
      >
        {this.props.header}
        {!readOnly &&
          <div style={{ width: '100%', padding: '10px' }}>
            <StyleControls
              editorState={this.state.editorState}
              onToogleInlineStyle={this.onToogleInlineStyle}
              onToogleBlockType={this.onToogleBlockType}
              style={styleControlsStyle}
            />
          </div>
        }
        <div style={{ paddingTop: '5px', borderTop: '1px solid #e4e3e3' }}>
          <div
            onClick={this.focus}
            style={editorStyle}
          >
            <Editor
              style={editorStyle}
              editorState={this.state.editorState}
              onChange={this.onChange}
              placeholder={'type here ...'}
              handleKeyCommand={this.handleKeyCommand}
              plugins={plugins}
              spellCheck
              readOnly={readOnly}
              ref={ed => (this.editor = ed)}
            />
            <MentionSuggestions
              onSearchChange={this.onSearchChange}
              suggestions={this.state.suggestions}
            />
            <EmojiSuggestions />
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default TextEditorBox
