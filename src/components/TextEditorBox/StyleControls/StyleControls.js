/* @flow */

import React, { PropTypes } from 'react'
import Bold from 'material-ui/svg-icons/editor/format-bold'
import Italic from 'material-ui/svg-icons/editor/format-italic'
import Underline from 'material-ui/svg-icons/editor/format-underlined'
import ListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted'
import ListNumbered from 'material-ui/svg-icons/editor/format-list-numbered'
import Quote from 'material-ui/svg-icons/editor/format-quote'
import Code from 'material-ui/svg-icons/action/code'
import IconButton from 'material-ui/IconButton'
import { Icon } from 'components'

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: Bold },
  { label: 'Italic', style: 'ITALIC', icon: Italic },
  { label: 'Underline', style: 'UNDERLINE', icon: Underline },
]

const BLOCK_TYPES = [
  { label: 'Blockquote', style: 'blockquote', icon: Quote },
  { label: 'UL', style: 'unordered-list-item', icon: ListBulleted },
  { label: 'OL', style: 'ordered-list-item', icon: ListNumbered },
  { label: 'Code Block', style: 'code-block', icon: Code },
]

// const HEADER_STYLES = [
//   { value: 1, style: 'header-one' },
//   { value: 2, style: 'header-two' },
//   { value: 3, style: 'header-three' },
//   { value: 4, style: 'header-four' },
//   { value: 5, style: 'header-five' },
//   { value: 6, style: 'header-six' },
// ]


const StyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  const { editorState, style } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  const activeColor = props.activeColor || '#1dafa6'
  const notActiveColor = 'rgb(181, 180, 180)'


  return (
    <div className="RichEditor-controls" style={style}>
      {INLINE_STYLES.map(type =>
        <IconButton
          style={{
            padding: 0,
            width: '35px',
            height: '35px',
          }}
          key={type.label}
          disableTouchRipple
          title={type.label}
          onClick={() => props.onToogleInlineStyle(type.style)}
        >
          <Icon
            icon={<type.icon />}
            size={35}
            color={currentStyle.has(type.style) ? activeColor : notActiveColor}
          />
        </IconButton>
      )}
      {BLOCK_TYPES.map(type =>
        <IconButton
          style={{
            padding: 0,
            width: '35px',
            height: '35px',
          }}
          key={type.label}
          disableTouchRipple
          title={type.label}
          onClick={() => props.onToogleBlockType(type.style)}
        >
          <Icon
            icon={<type.icon />}
            size={35}
            color={type.style === blockType ? activeColor : notActiveColor}
          />
        </IconButton>
      )}
    </div>
  )
}

StyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  // onToogleInlineStyle: PropTypes.func.isRequired,
  // onToogleBlockType: PropTypes.func.isRequired,
  activeColor: PropTypes.string,
  style: PropTypes.object,
}

export default StyleControls
