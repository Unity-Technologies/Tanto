/* @flow */

import React from 'react'
import Alert from 'react-bootstrap/lib/Alert'

export type Props = {
  text?: string,
  error?: Object,
  propertyName?: string
}

function ErrorMessage(props: Props) {
  const propertyName = props.propertyName || 'message'
  let message = 'Error'
  if (props.text) {
    message = props.text
  } else if (props.error && props.error.hasOwnProperty(propertyName)) {
    message = props.error[propertyName]
  }
  return (
    <Alert bsStyle="danger" style={{ fontSize: '13px' }}>
      <strong><i className="fa fa-exclamation-circle" aria-hidden="true"></i> </strong> {message}
    </Alert>
  )
}

export default ErrorMessage
