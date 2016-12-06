/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import ErrorMessage from 'components/ErrorMessage'
import List from 'components/List'
import PullRequestListItem from './PullRequestListItem'

import './styles.css'

export type Props = {
  totalPagesCount?: number,
  activePage?: number,
  items: Array<{
    id: string,
  }>,
  isFetching?: boolean,
  totalNew?: number,
  totalInProgress?: number,
  total?: number,
  error?: string,
  showRemoveButton?: boolean,
  onRemoveClick?: Function,
}

function PullRequestList(props: Props) {
  const {
    items,
    activePage,
    totalPagesCount,
    isFetching, error,
    totalInProgress,
    showRemoveButton,
    onRemoveClick,
    total,
    totalNew } = props
  return (
    <div>
      {isFetching && <LinearProgress />}
      {error && <ErrorMessage error />}
      <div className="sub-title">
        {total} total, {totalInProgress} in progress, {totalNew} new
      </div>
      <List
        items={items}
        totalPagesCount={totalPagesCount}
        activePage={activePage}
      >
        {items.map(item => (
          <PullRequestListItem
            key={item.id}
            {...item}
            showRemoveButton={showRemoveButton}
            onRemoveClick={onRemoveClick}
          />
        ))}
      </List>
    </div>
  )
}

export default PullRequestList
