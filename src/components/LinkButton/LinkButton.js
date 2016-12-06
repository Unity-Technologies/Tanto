export type Props = {
  style?: Object,
  label?: string,
  to?: string,
};

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

function LinkButton(props) {
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
