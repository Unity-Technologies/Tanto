/* @flow */
import React from 'react'
import ErrorMessage from 'components/ErrorMessage'
import pureComponent from 'universal/react-pure-render'
import LoadingIcon from 'components/LoadingIcon'
type LoadingComponentProps = {
  status: {
    error: Object,
    isFetching: boolean
  },
  children: any
}

function LoadingComponent(props: LoadingComponentProps) {
  return (
    <div>
      {props.status.error && <ErrorMessage error={props.status.error} />}
      {props.status.isFetching && <LoadingIcon />}
      {!props.status.isFetching && !props.status.error &&
        <div>
          {props.children}
        </div>
      }
    </div>)
}


export default pureComponent(LoadingComponent)

