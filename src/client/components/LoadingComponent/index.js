/* @flow */
import React from 'react'
import type { StatusType } from 'ducks/fetch'
import ErrorMessage from 'components/ErrorMessage'
import TransitionGroup from 'react-addons-transition-group'
import pureComponent from 'universal/react-pure-render'
import LoadingIcon from 'components/LoadingIcon'
type LoadingComponentProps = {
  status: StatusType,
  children: any
}

function LoadingComponent(props: LoadingComponentProps) {
  return (
    <div>
      {status.error && <ErrorMessage error={status.error} />}
      {status.isFetching && <LoadingIcon />}
      {!status.isFetching && !status.error &&
        <div>
          {props.children}
        </div>
      }
    </div>)
}


export default pureComponent(LoadingComponent)

