import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { red500 } from 'material-ui/styles/colors'

function ErrorMessage({ error }) {
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

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
}

export default ErrorMessage
