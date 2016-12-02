/* eslint-disable import/no-extraneous-dependencies */

import React, { PropTypes } from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import ErrorMessage from 'components/ErrorMessage'
import List from 'components/List'
import PullRequestListItem from './PullRequestListItem'

import './styles.css'

function PullRequestList(props) {
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

PullRequestList.propTypes = {
  totalPagesCount: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  totalNew: PropTypes.number.isRequired,
  totalInProgress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  error: PropTypes.string,
  showRemoveButton: PropTypes.bool,
  onRemoveClick: PropTypes.func,
}

export default PullRequestList

