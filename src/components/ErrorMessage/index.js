/* @flow */

import React from 'react'
import Paper from 'material-ui/Paper'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { red500 } from 'material-ui/styles/colors'

export type Props = { error: string };

function ErrorMessage({ error }: Props) {
  return (
    <Paper style={{ padding: '20px' }}>
      <div style={{ float: 'left' }}>
        <ErrorIcon color={red500} />
      </div>
      <div>
        {error}
      </div>
    </Paper>
  )
}

export default ErrorMessage
