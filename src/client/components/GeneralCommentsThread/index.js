/* @flow */
import React, { Component } from 'react'
import type { GeneralCommentType } from 'universal/types'
import Comment from './Comment'

export type UserType = {
  username: string,
  slack: {
    avatar: string
  }
}

type Props = {
  comments: Array<GeneralCommentType>,
  loggedUser: UserType,
  onUpdate: (id: string, value: string) => void,
  onDelete: (id: string) => void,
}

class GeneralCommentThread extends Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      editMode: false,
    }
  }

  render() {
    return (
      this.props.comments.map(c =>
        <Comment comment={c} canEdit={c.author.username === this.props.loggedUser.username} />
      )
    )
  }
}


export default GeneralCommentThread
