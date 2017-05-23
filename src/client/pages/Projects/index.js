/* @flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { fetchRepositories } from 'ducks/repositories/actions'
import { groupPathFromPath } from 'routes/helpers'
import type { StatusType } from 'ducks/fetch/selectors'
import { getRepositoriesFetchState } from 'ducks/repositories/selectors'
import Breadcrumb from 'components/Breadcrumb'
import RepositoryList from 'components/RepositoryList'
import type { RepositoryType, GroupType } from 'components/RepositoryList'
import LoadingComponent from 'components/LoadingComponent'

export type Props = {
  status: StatusType,
  repositories: Array<RepositoryType>,
  groups: Array<GroupType>,
  dispatch: Function,
  pathname: string,
}

export class Projects extends PureComponent {
  componentWillMount() {
    const { dispatch, pathname } = this.props
    dispatch(fetchRepositories(groupPathFromPath(pathname)))
  }

  componentWillReceiveProps(nextProp: any, nextState?: Object) {
    if (this.props.pathname !== nextProp.pathname) {
      this.props.dispatch(fetchRepositories(groupPathFromPath(nextProp.pathname)))
    }
  }

  props: Props

  render() {
    const { status, repositories, groups, pathname } = this.props

    return (
      <div>
        <Helmet title="Projects" />
        <Breadcrumb path={pathname} skip={0} />
        <LoadingComponent status={status}>
          {!status.isFetching && !repositories.length && !groups.length && !status.error &&
            <div style={{ textAlign: 'center', padding: '10%' }} >
              <h4>NO PROJECTS</h4>
            </div>
          }
          <RepositoryList groups={groups} repositories={repositories} path={pathname} />
        </LoadingComponent>
      </div>
    )
  }
}

export default connect(getRepositoriesFetchState)(Projects)
