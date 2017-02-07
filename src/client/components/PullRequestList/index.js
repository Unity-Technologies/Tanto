/* @flow */

import React from 'react'
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
  showRemoveButton?: boolean,
  onRemoveClick?: Function,
  onPageSelect: Function,
}

function PullRequestList(props: Props) {
  return (
    <List
      total={props.total}
      activePage={props.currentPage}
      pageSize={props.pageSize}
      onPageSelect={props.onPageSelect}
    >
      {props.items.map(item => (
        <PullRequestListItem
          key={item.id}
          pullRequest={item}
          showRemoveButton={props.showRemoveButton}
          onRemoveClick={props.onRemoveClick}
        />
      ))}
    </List>
  )
}

export default PullRequestList
