/* @flow */
import React from 'react'
import { Link } from 'react-router'

import CategoryModule from './common'


const CATEGORIES = [
  { url: 'summary', name: 'Summary' },
  { url: 'diff', name: 'Files' },
  { url: 'commits', name: 'Commits' },
  { url: 'issues', name: 'Issues' },
]

const TabTitle = ({ text, badge }) =>
  <div style={{ display: 'inline-flex' }}>
    <div style={{ float: 'left', marginRight: '5px' }}>
      {text}
    </div>
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
  repoName: string,
  rootPath: string,
}

const LayoutDeveloper = ({ repoName, currentCategory, pullRequestId, rootPath } : Props) =>
  <div style={{ padding: '0 20px' }}>
    <Header currentCategory={currentCategory} rootPath={rootPath} />
    <CategoryModule repoName={repoName} pullRequestId={pullRequestId} type={currentCategory} />
  </div>

export default LayoutDeveloper
