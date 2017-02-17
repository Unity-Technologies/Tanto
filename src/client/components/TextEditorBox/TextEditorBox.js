// TODO: add flow annotations

import React, { Component } from 'react'
import { EditorState, RichUtils, ContentState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createHashtagPlugin from 'draft-js-hashtag-plugin'
import exporter from 'draft-js-ast-exporter'
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

const linkifyPlugin = createLinkifyPlugin()
const hashtagPlugin = createHashtagPlugin()

const plugins = [emojiPlugin, mentionPlugin, linkifyPlugin, hashtagPlugin]

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

    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onToogleEditMode = this.onToogleEditMode.bind(this)
    this.onClear = this.onClear.bind(this)
    this.onToogleInlineStyle = this.onToogleInlineStyle.bind(this)
    this.onToogleBlockType = this.onToogleBlockType.bind(this)
    this.focus = this.focus.bind(this)
  }

  props: Props

  onChange(editorState) {
    this.setState({
      editorState,
    })
    if (this.props.onTextChanged) {
      this.props.onTextChanged(exporter(this.state.editorState))
    }
  }

  onSearchChange({ value }) {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, this.state.suggestions),
    })
  }

  onToogleEditMode() {
    this.setState({
      readOnly: true,
    })
  }

  onClear() {
    this.setState({
      editorState: EditorState.createEmpty(),
    })
  }

  onToogleInlineStyle(style) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
  }

  onToogleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  focus() {
    return this.editor.focus()
  }

  render() {
    const {
      readOnly,
      placeholder,
      hideStyleControls,
      style,
      editorStyle,
      author,
      styleControlsStyle,
    } = this.props
    return (
      <div
        className="RichEditor-root"
        style={style}
      >
        {this.props.header}
      {!hideStyleControls && !readOnly &&
        <div style={{ width: '100%', padding: '10px' }}>
          <div style={{ display: 'inline-flex' }}>
            <Avatar />
            <div
              style={{
                fontSize: '14px', color: '#31708f', padding: '0 20px',
                fontWeight: 'bold',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              {author}
            </div>
          </div>
          <StyleControls
            editorState={this.state.editorState}
            onToogleInlineStyle={this.onToogleInlineStyle}
            onToogleBlockType={this.onToogleBlockType}
            style={styleControlsStyle}
          />
        </div>
      }
        <div style={{ paddingTop: '5px' }}>
          <div
            className="RichEditor-editor"
            onClick={this.focus}
            style={editorStyle}
          >
            <Editor
              style={editorStyle}
              editorState={this.state.editorState}
              onChange={this.onChange}
              placeholder={!readOnly ? placeholder : ''}
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
