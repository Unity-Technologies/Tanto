/* @flow */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import Overview from 'pages/Repo/Overview'
import PullRequest from 'pages/Repo/PullRequest'
import { fetchRepository } from 'ducks/repositories/actions'
import { getRepo, getFullName } from 'ducks/repositories/selectors'
import { connect } from 'react-redux'


export type Props = {
  dispatch: Function,
  params: {
    splat: String,
    category: String,
  },
  path: String,
  fullName: string,
  match: Object,
  repository?: Object,
  children?: Object,
  theme?: Object,
}

const mapStateToProps = (state, props) => ({
  repository: getRepo(state, props),
  fullName: getFullName(state, props),
})

class Repo extends Component {

  componentWillMount() {
    this.props.dispatch(fetchRepository(this.props.fullName))
  }

  props: Props

  render() {
    const name = this.props.fullName

    if (!this.props.repository) {
      return (<h1>Project {name} Not Found</h1>)
    }
    return (
      <div>
        <Helmet title={`Project ${name}`} />
        <div>
          <Switch>
            <Route path={`${this.props.match.url}/_/pull_requests/:prid/:category?`} component={PullRequest} />
            <Route
              path={`${this.props.match.url}(/_/)?:category?`}
              render={({ match, location, ...rest }) => (
                <Overview match={match} location={location} repository={this.props.repository} dispatch={this.props.dispatch} />
                )}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Repo)
