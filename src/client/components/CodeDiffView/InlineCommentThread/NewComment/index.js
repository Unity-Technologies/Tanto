/* @flow */
import React from 'react'
import RichTextEditor from 'components/RichTextEditor'
import Avatar from 'components/Avatar'
import type { UserType } from '../index.js'

export type Props = {
  loggedUser: UserType,
  handleOnSave: (text: string) => void,
  handleOnClose: Function
}

export const NewComment = (props: Props) => (
  <div className="inline-comment-box">
    <div className="inline-comment-box-avatar">
      <Avatar avatar={props.loggedUser.slack ? props.loggedUser.slack.avatar : ''} />
    </div>
    <div className="inline-comment-box-content" >
      <RichTextEditor
        onCancel={props.handleOnClose}
        onSave={props.handleOnSave}
        cancelButtonTitle={'Cancel'}
        saveButtonTitle={'Add comment'}
      />
    </div>
  </div>
)

export default NewComment
