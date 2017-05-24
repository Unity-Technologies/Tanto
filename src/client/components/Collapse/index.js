/* @flow */
import React from 'react'
import { pureComponent } from 'components/PureComponent'


type Props = {
  isOpened: boolean,
  children: any
}

function Collapse(props: Props) {
  if (!props.isOpened) {
    return null
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

export default pureComponent(Collapse)

