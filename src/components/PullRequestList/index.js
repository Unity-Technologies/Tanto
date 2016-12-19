/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import ErrorMessage from 'components/ErrorMessage'
import List from 'components/List'
import PullRequestListItem from './PullRequestListItem'

import './styles.css'

export type Props = {
  total?: number,
  activePage: number,
  pageSize: number,
  items: Array<{
    id: string,
  }>,
  isFetching: boolean,
  error?: string,
  showRemoveButton?: boolean,
  onRemoveClick?: Function,
  onPageSelect: Function,
}

function PullRequestList(props: Props) {
  const {
    items,
    activePage,
    total,
    pageSize,
    isFetching,
    error,
    showRemoveButton,
    onRemoveClick,
    onPageSelect } = props
  return (
    <div>
      {isFetching && <LinearProgress />}
      {error && <ErrorMessage text={error} />}
      <List
        items={items}
        total={total}
        activePage={activePage}
        pageSize={pageSize}
        onPageSelect={onPageSelect}
      >
        {items.map(item => (
          <PullRequestListItem
            key={item.id}
            pullRequest={item}
            showRemoveButton={showRemoveButton}
            onRemoveClick={onRemoveClick}
          />
        ))}
      </List>
    </div>
  )
}

export default PullRequestList
