// TODO: finish flow annotations

import React, { Component } from 'react'
import { TextEditorBox, Icon, TestAvatar } from 'components'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Settings from 'material-ui/svg-icons/action/settings'
import Close from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { Button, ButtonGroup } from 'react-bootstrap'

export type Props = {
  id?: string,
  user?: string,
  author?: string,
  message?: any,
  postDate?: string,
  simpleText?: boolean,
  style?: Object,
  headerStyle?: Object,
  buttonGroupStyle?: Object,
  issue?: boolean,
  niceToHave?: boolean,
  codeStyle?: boolean,
  hideSettings?: boolean,
}

class Comment extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props: Props) {
    super(props)
    this.state = {
      editMode: false,
      commentText: '',
      niceToHave: this.props.niceToHave,
      issue: this.props.issue,
      codeStyle: this.props.codeStyle,
      voting: {
        niceToHave: [],
        issue: [],
        codeStyle: [],
      },
    }
    this.onCommentEdit = this.onCommentEdit.bind(this)
    this.onCommentSave = this.onCommentSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  props: Props

  onCommentEdit() {
    this.setState({ editMode: true })
  }

  // onCommentDelete() {
  //   // TODO: dispatch reducer action to delete comment
  // }

  onCommentSave() {
    this.setState({ editMode: false })
      // TODO: dispatch reducer action to save edited comment
  }

  handleChange(event, value) {
    switch (value) {
      case '1':
        this.setState({
          issue: !this.state.issue,
        })
        return
      case '2':
        this.setState({
          niceToHave: !this.state.niceToHave,
        })
        return
      case '3':
        this.setState({
          codeStyle: !this.state.codeStyle,
        })
        return
      default:
        return
    }
  }

  render() {
    const {
      id,
      user,
      author,
      message,
      postDate,
      style,
      simpleText,
      headerStyle,
      buttonGroupStyle,
    } = this.props
    const { editMode } = this.state
    const isAuthor = user === author
    const iconButtonStyle = {
      padding: 0,
      width: '30px',
      height: '30px',
    }

    const votesCountStyle = {
      padding: '0px 0px 0px 10px',
      fontSize: '14px',
      color: 'grey',
    }

    const defaultCommentStyle = {
      border: '2px solid rgb(224, 224, 227)',
      borderRadius: '10px 10px 10px 10px',
      marginBottom: '10px',
      boxShadow: '3px 2px 11px 1px #cac9c9',
      ...style,
    }

    const commentHeaderStyle = {
      float: 'right',
      padding: '8px 15px',
      fontSize: '14px',
      color: 'grey',
    }

    const iconStyle = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: 'lightgrey',
      fontSize: '17px',
    }

    return (
      <div>
        <div style={style || defaultCommentStyle}>
          {!editMode &&
            <div style={{ overflow: 'auto', padding: '3px' }}>
              <div style={{ float: 'left', padding: '6px 6px', fontFamily: 'Lato' }}>
                <TestAvatar />
                <div style={headerStyle || commentHeaderStyle}>
                  <strong style={{ color: '#31708f' }}>{author}</strong> commented {postDate}
                </div>
              </div>
            {isAuthor &&
              <div style={{ float: 'right', padding: '10px' }}>
                {!this.props.hideSettings &&
                  <IconMenu
                    selectedMenuItemStyle={{ color: 'green' }}
                    menuStyle={{ border: '1px solid lightgrey' }}
                    iconButtonElement={
                      <IconButton style={iconButtonStyle}>
                        <Icon icon={<Settings />} size={30} color="rgb(181, 180, 180)" />
                      </IconButton>}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    onChange={this.handleChange}
                    insetChildren
                  >
                    <MenuItem
                      value="1"
                      primaryText="Mark as issue"
                      checked={this.state.issue}
                    />
                    <MenuItem
                      value="2"
                      primaryText="Mark as nice to have"
                      checked={this.state.niceToHave}
                    />
                    <MenuItem
                      value="3"
                      primaryText="Mark as code style"
                      checked={this.state.codeStyle}
                    />
                  </IconMenu>
                }
                <IconButton
                  style={iconButtonStyle}
                  key="edit"
                  disableTouchRipple
                  title="Edit"
                  onClick={this.onCommentEdit}
                >
                  <Icon icon={<Edit />} size={30} color="rgb(181, 180, 180)" />
                </IconButton>
                <IconButton
                  style={iconButtonStyle}
                  key="delete"
                  disableTouchRipple
                  title="Delete comment"
                  onClick={this.onCommentDelete}
                >
                  <Icon icon={<Close />} size={30} color="rgb(181, 180, 180)" />
                </IconButton>

              </div>
            }
            </div>
          }
          <TextEditorBox
            onTextChanged={(value) => { this.state.commentText = value }}
            ref={id}
            text={message}
            readOnly={!editMode}
            simpleText={simpleText}
            styleControlsStyle={{ borderRadius: '10px 10px 0 0' }}
          />
        {!this.props.hideSettings &&
         (this.state.issue || this.state.niceToHave || this.state.codeStyle) &&
          <div style={buttonGroupStyle || { overflow: 'auto' }}>
            <ButtonGroup style={{ float: 'right', padding: '5px' }}>
              {this.state.issue &&
                <Button style={{ ...iconStyle, color: '#ca6b4a' }} >
                  <i className="fa fa-bug" title="Issue" />
                  <span style={votesCountStyle}>1</span>
                </Button>
              }
              {this.state.niceToHave &&
                <Button style={{ ...iconStyle, color: 'rgba(84, 105, 75, 0.68)' }} >
                  <i className="fa fa-thumbs-up" title="Nice to have" />
                  <span style={votesCountStyle}>3</span>
                </Button>
              }
              {this.state.codeStyle &&
                <Button style={{ ...iconStyle, color: '#d43a5a' }} >
                  <i className="fa fa-thumbs-down" title="Bad code" />
                </Button>
              }
            </ButtonGroup>
          </div>
        }
        </div>
        {editMode &&
          <RaisedButton
            label="Save Comment"
            backgroundColor="#d9edf7"
            style={{ marginBottom: '10px', marginRight: '10px' }}
            onClick={this.onCommentSave}
          />
        }
      </div>
    )
  }
}

export default Comment
