/* @flow */

import React from 'react'
import Alert from 'react-bootstrap/lib/Alert'

export type Props = { text: string }

function ErrorMessage({ text }: Props) {
  return (
    <Alert bsStyle="danger" style={{ fontSize: '13px' }}>
      <strong><i className="fa fa-exclamation-circle" aria-hidden="true"></i> </strong> {text}
    </Alert>
  )
}

export default ErrorMessage
