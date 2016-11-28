/* @flow */

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

LinkButton.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default LinkButton
