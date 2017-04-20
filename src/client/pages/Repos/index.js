/* @flow */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import _ from 'lodash'
import Repo from 'pages/Repo/Repo'
import { connect } from 'react-redux'
import { fetchRepositories } from 'ducks/repositories/actions'
import { selectSideBarItem } from 'ducks/sidebar'
import type { StatusType } from 'ducks/fetch/selectors'
import { getRepositoriesFetchState } from 'ducks/repositories/selectors'
import Breadcrumb from 'components/Breadcrumb'
import RepositoryList from 'components/RepositoryList'
import type { RepositoryType, GroupType } from 'components/RepositoryList'
import LoadingComponent from 'components/LoadingComponent'

export type Props = {
  dispatch: Function,
  status: StatusType,
  repositories: Array<RepositoryType>,
  groups: Array<GroupType>,
  dispatch: Function,
  theme: Object,
  match: Object,
  style: Object,
  repo: Object,
  group: Object,
  fullName: string,
  location: Object,
  path: string,
  breadcrumbItems: Array<Object>
}

export class Repos extends Component {
  componentWillMount() {
    const { dispatch, fullName } = this.props
    dispatch(fetchRepositories(fullName))
    dispatch(selectSideBarItem(2))
  }

  componentWillReceiveProps(nextProp: any, nextState?: Object) {
    if (this.props.fullName !== nextProp.fullName) {
      this.props.dispatch(fetchRepositories(nextProp.fullName))
    }
  }

  props: Props

  render() {
    const { status, repo, group, location, path, match } = this.props
    return (
      <div>
        <Helmet title="Projects" />
        <Breadcrumb path={location.pathname} skip={0} />
        <LoadingComponent status={status}>
          {!status.isFetching && !repo && !group && !status.error &&
            <div style={{ textAlign: 'center', padding: '10%' }} >
              <h4>NO PROJECTS</h4>
            </div>
          }
      {group ?
        <RepositoryList
          groups={_.get(group, ['groups', 'nodes'], [])}
          repositories={_.get(group, ['repositories', 'nodes'], [])}
          path={path}
        />
       : repo &&
         <Repo match={match} />
      }
        </LoadingComponent>
      </div>
    )
  }
}

export default connect(getRepositoriesFetchState)(Repos)
