/* @flow */
import React from 'react'
import ErrorMessage from 'components/ErrorMessage'
import pureComponent from 'universal/react-pure-render'
import LinearProgress from 'material-ui/LinearProgress'

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
      {props.status.isFetching &&
        <LinearProgress />
      }
      {props.status.error && !props.status.isFetching &&
        <ErrorMessage error={props.status.error} />
      }
      <div>
        {props.children}
      </div>
    </div>)
}


export default pureComponent(LoadingComponent)

