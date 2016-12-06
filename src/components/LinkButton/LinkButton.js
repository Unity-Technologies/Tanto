/* @flow */

import React from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

export type Props = {
  style?: Object,
  label: string,
  to: string,
};

function LinkButton(props: Props) {
  const { style, to, label } = props
  return (
    <Link to={to}>
      <RaisedButton
        style={style}
        label={label}
        backgroundColor="#efefef"
      />
    </Link>
  )
}

export default LinkButton
