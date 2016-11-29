/* @flow */

import projectQuery from 'graphql-queries/project'
import _ from 'lodash'

export const PROJECTS_REQUEST = 'PROJECTS_REQUEST'
export const PROJECTS_SUCCESS = 'PROJECTS_SUCCESS'
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE'

export const PROJECT_BRANCHES_REQUEST = 'PROJECT_BRANCHES_REQUEST'
export const PROJECT_BRANCHES_SUCCESS = 'PROJECT_BRANCHES_SUCCESS'
export const PROJECT_BRANCHES_FAILURE = 'PROJECT_BRANCHES_FAILURE'

export const PROJECT_CHANGELOG_REQUEST = 'PROJECT_CHANGELOG_REQUEST'
export const PROJECT_CHANGELOG_SUCCESS = 'PROJECT_CHANGELOG_SUCCESS'
export const PROJECT_CHANGELOG_FAILURE = 'PROJECT_CHANGELOG_FAILURE'

export const PROJECT_FILES_REQUEST = 'PROJECT_FILES_REQUEST'
export const PROJECT_FILES_SUCCESS = 'PROJECT_FILES_SUCCESS'
export const PROJECT_FILES_FAILURE = 'PROJECT_FILES_FAILURE'

export const PROJECT_PULLREQUESTS_REQUEST = 'PROJECT_PULLREQUESTS_REQUEST'
export const PROJECT_PULLREQUESTS_SUCCESS = 'PROJECT_PULLREQUESTS_SUCCESS'
export const PROJECT_PULLREQUESTS_FAILURE = 'PROJECT_PULLREQUESTS_FAILURE'

export const PROJECTS_FETCHING = 'PROJECT_FETCHING'

export const types = {
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_FAILURE,
  PROJECTS_FETCHING,
  PROJECT_BRANCHES_REQUEST,
  PROJECT_BRANCHES_SUCCESS,
  PROJECT_BRANCHES_FAILURE,
  PROJECT_CHANGELOG_REQUEST,
  PROJECT_CHANGELOG_SUCCESS,
  PROJECT_CHANGELOG_FAILURE,
  PROJECT_FILES_REQUEST,
  PROJECT_FILES_SUCCESS,
  PROJECT_FILES_FAILURE,
  PROJECT_PULLREQUESTS_REQUEST,
  PROJECT_PULLREQUESTS_SUCCESS,
  PROJECT_PULLREQUESTS_FAILURE,
}

/**
 * Update project field with the action result
 * @param  {[type]} projects [description]
 * @param  {[type]} field    [description]
 * @param  {[type]} result   [description]
 * @return {[type]}          [description]
 */
export const updateProject = (projects, projectId, field, result) => {
  if (!projects || !field) {
    return projects
  }
  let item = _.find(projects, { id: projectId })
  if (!item) {
    item = {
      id: result.id,
    }
    projects.push(item)
  }

  item[`${field}`] = result.data

  return projects
}

/**
 * Adds repositories to group if it was already fetched. Do not expand here
 * more than two levels in deep
 * @param  {[type]} groups [description]
 * @param  {[type]} result [description]
 * @return {[type]}        [description]
 */
const expand = (result) => {
  if (!result) {
    return []
  }

  let flatProjects = []
  let groups = []
  if (result.groups) {
    groups = result.groups.map((group) => {
      const groupProjects = group.repositories.edges.map(repo => repo.node)

      flatProjects = [...flatProjects, ...groupProjects]

      return {
        id: group.id,
        name: group.name,
        projects: groupProjects,
      }
    })
  }
  let projects = []
  if (result.repositories) {
    projects = result.repositories
  }
  const testgroup = { name: 'testgroup',
                      id: 22,
                      description: 'tresting',
                      projects: [...projects],
                      groups: {} }
  const emptygroup = { name: 'Empty Group',
                       id: 'asGDTJU34',
                       description: 'tresting',
                       projects: [],
                       groups: { 22: testgroup } }
  testgroup.groups[22] = testgroup
  testgroup.groups[emptygroup.id] = emptygroup
  return {
    tree: {
      groups: { 22: testgroup, asGDTJU34: emptygroup, other: groups },
      projects: [...projects],
    },
    projects: [...flatProjects, ...projects],
  }
}

/**
 * PROJECTS initial state
 * @type {Object}
 */
const initialState = {
  isFetching: false,
  tree: { groups: [], projects: [] },
  projects: [],
}

/**
 * PROJECTS reducer
 * @param  {[type]} state  =             initialState [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function project(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_REQUEST:
      return {
        ...state,
      }
    case PROJECTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors.map(item => item.message),
      }
    case PROJECTS_SUCCESS:
      return {
        ...state,
        ...expand(action.result),
      }
    case PROJECT_BRANCHES_REQUEST:
    case PROJECT_FILES_REQUEST:
    case PROJECT_CHANGELOG_REQUEST:
    case PROJECT_PULLREQUESTS_REQUEST:
      return {
        ...state,
        projects: updateProject(state.projects, action.id, 'fetching', true),
      }
    case PROJECT_BRANCHES_FAILURE:
    case PROJECT_FILES_FAILURE:
    case PROJECT_CHANGELOG_FAILURE:
    case PROJECT_PULLREQUESTS_FAILURE:
      return {
        ...state,
        projects: updateProject(state.projects, action.id, 'fetching', false),
      }
    case PROJECT_BRANCHES_SUCCESS:
      return {
        ...state,
        projects: updateProject(state.projects, action.result.id, {
          branches: action.result,
          fetching: false,
        }),
      }
    case PROJECT_CHANGELOG_SUCCESS:
      return {
        ...state,
        projects: updateProject(state.projects, action.result.id, {
          changelog: action.result,
          fetching: false,
        }),
      }
    case PROJECT_FILES_SUCCESS:
      return {
        ...state,
        projects: updateProject(state.projects, action.result.id, {
          files: action.result,
          fetching: false,
        }),
      }
    case PROJECT_PULLREQUESTS_SUCCESS:
      return {
        ...state,
        projects: updateProject(state.projects, action.result.id, {
          pullrequests: action.result,
          fetching: false,
        }),
      }
    case PROJECTS_FETCHING:
      return {
        ...state,
        isFetching: action.fetching,
      }

    default:
      return state
  }
}

/**
 * Fetch groups and projects the first level action
 * @type {[type]}
 */
export const fetchProjects = () => ({
  type: PROJECTS_REQUEST,
})


export const fetchProjectsFailure = errors => ({
  type: PROJECTS_FAILURE,
  errors,
})

export const fetchProjectsSuccess = result => ({
  type: PROJECTS_SUCCESS,
  result,
})

/**
 * Sets the isFetching status
 */
export const fetchingStatus = status => ({
  type: PROJECTS_FETCHING,
  fetching: status,
})


/**
 * Fetch gproject branches
 * @type {[type]}
 */
export const fetchProjectBranches = id => ({
  types: [PROJECT_BRANCHES_REQUEST, PROJECT_BRANCHES_SUCCESS, PROJECT_BRANCHES_FAILURE],
  promise: api => api(projectQuery.projectBranches(id)),
})

/**
 * Fetch project changelog
 * @type {[type]}
 */
export const fetchProjectChangelog = id => ({
  types: [PROJECT_CHANGELOG_REQUEST, PROJECT_CHANGELOG_SUCCESS, PROJECT_CHANGELOG_FAILURE],
  promise: api => api(projectQuery.projectChangelog(id)),
})

/**
 * Fetch project files tree structure
 * @type {[type]}
 */
export const fetchProjectFiles = id => ({
  types: [PROJECT_FILES_REQUEST, PROJECT_FILES_SUCCESS, PROJECT_FILES_FAILURE],
  promise: api => api(projectQuery.projectFiles(id)),
})

/**
 * Fetch project pull requests
 * @type {[type]}
 */
export const fetchProjectPullRequests = id => ({
  types: [PROJECT_PULLREQUESTS_REQUEST, PROJECT_PULLREQUESTS_SUCCESS, PROJECT_PULLREQUESTS_FAILURE],
  promise: api => api(projectQuery.projectPullRequests(id)),
})

export const actions = {
  fetchProjects,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  fetchingStatus,
}
