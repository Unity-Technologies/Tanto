/* eslint-disable max-len */

// FIXME: this is not a component...

import {
  SIDE_BAR_ITEMS,
  SIDE_BAR_SELECTED_ITEM,
  SIDE_BAR_SUBITEMS,
} from 'ducks/sidebar'


export const project = (store, name) => {
  const items = [
    { title: 'Home', route: '/', icon: 'home' },
    { title: 'Project', route: `/project/${name}`, icon: 'folder' },
    { title: 'Files', route: `/project/${name}/files`, icon: 'files-o' },
    { title: 'Changelog', route: `/project/${name}/changelog`, icon: 'calendar' },
    { title: 'Pull Requests', route: `/project/${name}/pullrequests`, icon: 'tasks' },
  ]

  store.dispatch({ type: SIDE_BAR_ITEMS, items })
  const subitems = []
  store.dispatch({ type: SIDE_BAR_SUBITEMS, subitems })
  const selected = 1
  store.dispatch({ type: SIDE_BAR_SELECTED_ITEM, selected })
}


export const pullrequest = (store) => {
  const subitems = [
    { title: 'Top', link: 'page-top', icon: 'arrow-up', color: 'rgba(109, 120, 141, 0.980392)', badge: null, iconbadge: null },
    { title: 'Summary', link: 'summary', icon: 'circle', badge: null, iconbadge: null },
    { title: 'Changesets', link: 'changesets', icon: 'th', iconbadge: 'download' },
    { title: 'Files', link: 'files', icon: 'files-o', badge: null, iconbadge: null },
    { title: 'Issues', link: 'issues', icon: 'bug', badge: 3 },
    { title: 'Disscussion', link: 'discussion', icon: 'comments', badge: 5 },
    { title: 'Diff', link: 'diff', icon: 'file-code-o', badge: null },
    { title: 'Bottom', link: 'page-bottom', icon: 'arrow-down', color: 'rgba(109, 120, 141, 0.980392)', badge: null, iconbadge: null },
  ]

  store.dispatch({ type: SIDE_BAR_SUBITEMS, subitems })
  const selected = 2
  store.dispatch({ type: SIDE_BAR_SELECTED_ITEM, selected })
}


export const changeset = (store) => {
  const subitems = [
    { title: 'Top', link: 'page-top', icon: 'arrow-up', color: 'rgba(109, 120, 141, 0.980392)', badge: null, iconbadge: null },
    { title: 'Changesets', link: 'changesets', icon: 'th', iconbadge: 'download' },
    { title: 'Files', link: 'files', icon: 'files-o', badge: null, iconbadge: null },
    { title: 'Diff', link: 'diff', icon: 'file-code-o', badge: null },
    { title: 'Bottom', link: 'page-bottom', icon: 'arrow-down', color: 'rgba(109, 120, 141, 0.980392)', badge: null, iconbadge: null },
  ]

  store.dispatch({ type: SIDE_BAR_SUBITEMS, subitems })
  const selected = 2
  store.dispatch({ type: SIDE_BAR_SELECTED_ITEM, selected })
}
