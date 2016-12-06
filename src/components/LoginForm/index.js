// TODO: add flow annotations

import React from 'react'
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import ErrorMessage from 'components/ErrorMessage'
import LoadingIcon from 'components/LoadingIcon'
import './styles.css'

const validate = (values) => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Username is required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.username.length > 15) {
    errors.password = 'Password must be 15 characters or less'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    style={{ width: '100%' }}
    floatingLabelText={label}
    errorText={touched && error}
    placeholder={label}
    {...input}
    {...custom}
  />
)

export type Props = {
  isSendingRequest: boolean,
  onSubmitClick: Function,
  // fields: PropTypes.object,
  error?: string,
}

function LoginForm(props: Props) {
  const { isSendingRequest, error, onSubmitClick } = props
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmitClick(event.target[0].value, event.target[1].value)
  }

  return (
    <form onSubmit={handleSubmit} className="absolute-center" >
      {error && <ErrorMessage error={error} />}
      <div className="form-title">login</div>
      <div>
        <Field name="username" type="text" component={renderTextField} />
      </div>
      <div>
        <Field name="password" type="password" component={renderTextField} />
      </div>
      {
        isSendingRequest ?
          <LoadingIcon />
        :
          <RaisedButton
            fullWidth
            className="btn-submit"
            type="submit"
            label="Login"
            primary
            disabled={isSendingRequest}
          />
      }
    </form>
  )
}

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm)
