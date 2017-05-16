/* @flow */

import React from 'react'
import { pureComponent } from 'components/PureComponent'
import Helmet from 'react-helmet'

function ResetPassword() {
  return (
    <div >
      <Helmet title="Reset Password" />
      <h1>Reset password</h1>
    </div>
  )
}

export default pureComponent(ResetPassword)
