/* @flow */

import React from 'react'
import List from 'components/List'
import PureComponent from 'components/PureComponent'
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

class PullRequestList extends PureComponent {
  static defaultProps = {
    total: 0,
    showRemoveButton: false,
    onRemoveClick: null,
  }
  props: Props

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return nextProps.items && nextProps.items.length &&
      super.shouldComponentUpdate(nextProps, nextState)
  }

  render() {
    return (
      <List
        total={this.props.total}
        activePage={this.props.activePage}
        pageSize={this.props.pageSize}
        onPageSelect={this.props.onPageSelect}
      >
        {this.props.items.map(item => (
          <PullRequestListItem
            key={item.id}
            pullRequest={item}
            showRemoveButton={this.props.showRemoveButton}
            onRemoveClick={this.props.onRemoveClick}
          />
        ))}
      </List>
    )
  }
}

export default PullRequestList
