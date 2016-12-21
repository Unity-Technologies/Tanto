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
  const message = props.error ? props.error[propertyName] : (props.text ? props.text : 'Error')
  return (
    <Alert bsStyle="danger" style={{ fontSize: '13px' }}>
      <strong><i className="fa fa-exclamation-circle" aria-hidden="true"></i> </strong> {message}
    </Alert>
  )
}

export default ErrorMessage
