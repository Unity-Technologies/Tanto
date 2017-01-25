/* @flow */
import React from 'react'
import Badge from 'react-bootstrap/lib/Badge'
import { Link } from 'react-router'

import CategoryModule from './common'


const CATEGORIES = [
  { url: 'summary', name: 'Summary' },
  { url: 'discussion', name: 'Discussion' },
  { url: 'files', name: 'Files' },
  { url: 'changesets', name: 'Changesets' },
  { url: 'issues', name: 'Issues' },
  { url: 'diff', name: 'Diff' },
]

const TabTitle = ({ text, badge }) =>
  <div style={{ display: 'inline-flex' }}>
    <div style={{ float: 'left', marginRight: '5px' }}>
      {text}
    </div>
    {!!badge &&
      <div style={{ marginRight: '15px' }}>
        <Badge>
          {badge}
        </Badge>
      </div>
    }
  </div>

// FIXME: badge for changesets
const downloadIcon = <i className="fa fa-download" aria-hidden="true" />

// FIXME: badge for categories
const Header = ({ currentCategory, rootPath }) =>
  <ul className="nav nav-tabs" style={{ marginBottom: '24px' }}>
    {CATEGORIES.map(c =>
      <li className={c.url === currentCategory ? 'active' : ''} key={c.url}>
        <Link to={`${rootPath}/${c.url}`}>
          <TabTitle text={c.name} badge={c.url === 'changesets' ? downloadIcon : 1} />
        </Link>
      </li>
    )}
  </ul>

export type Props = {
  currentCategory: string,
  pullRequestId: string,
  rootPath: string,
}

const LayoutDeveloper = ({ currentCategory, pullRequestId, rootPath } : Props) =>
  <div style={{ padding: '0 20px' }}>
    <Header currentCategory={currentCategory} rootPath={rootPath} />
    <CategoryModule pullRequestId={pullRequestId} type={currentCategory} />
  </div>

export default LayoutDeveloper
