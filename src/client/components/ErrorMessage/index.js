/* @flow */

import React from 'react'
import Alert from 'react-bootstrap/lib/Alert'

export type Props = {
  text?: string,
  error?: Object,
  propertyName?: string
}

export const ErrorMessage = ({ text, error, propertyName }: Props) => {
  const propName = propertyName || 'message'
  let message = 'Error'
  if (text) {
    message = text
  } else if (error && propName in error) {
    message = error[propName]
  }
  return (
    <Alert bsStyle="danger" style={{ fontSize: '13px' }}>
      <strong><i className="fa fa-exclamation-circle" /> </strong> {message}
    </Alert>
  )
}

ErrorMessage.defaultProps = {
  text: null,
  error: null,
  propertyName: null,
}


export default ErrorMessage
