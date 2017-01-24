/* @flow */
import React from 'react'
import type { StatusType } from 'ducks/fetch'
import ErrorMessage from 'components/ErrorMessage'
import TransitionGroup from 'react-addons-transition-group'
import pureComponent from 'universal/react-pure-render'

type LoadingComponentProps = {
  status: StatusType,
  children: any
}

function LoadingComponent(props: LoadingComponentProps) {
  return (
    <TransitionGroup>
      {status.error && <ErrorMessage error={status.error} />}
      {!status.isFetching && !status.error && props.children}
    </TransitionGroup>)
}


export default pureComponent(LoadingComponent)

