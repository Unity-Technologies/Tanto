/* @flow */

import React from 'react'
import PureComponent from 'components/PureComponent'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { getBuilds, getABVBuild } from 'ducks/bfstats/selectors'
import { buildKatanaBuildLink } from 'routes/helpers'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import moment from 'moment'
import { BuildsResult } from 'universal/constants'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import './Builds.css'


export type BuildType = {
  builder: {
    name: string,
    project: string,
    friendlyName: string
  },
  result: number,
  buildTime: number,
  finish: string,
  number: number,
  start: string,
}

type PropsType = {
  builds: Array<BuildType>,
}

const subHeader = text => (
  <div className="sub-header">
    {text}
  </div>
)

const katanaBuildsColors = {
  [0]: '#61b122',
  [1]: '#e68f15',
  [2]: '#ee6442',
  [3]: '#4786ea',
  [4]: '#989498',
  [5]: '#989498',
  [7]: '#4786ea',
  [8]: '#e68f15',
  [11]: '#ee6442',
}

const renderBuildTime = (build: BuildType) => {
  let finish = build.finish
  if (!finish) {
    finish = moment(build.start).add(build.buildTime, 's')
  }
  const buildDate = moment(finish)
  return <div style={{ fontSize: '12px' }}>{`${buildDate.format('MMM Do YY, h:mm:ss a')} (${buildDate.fromNow()})`}</div>
}

const getBuildColor = (result: number) => (katanaBuildsColors[result] || '#989498')

const renderBuildStatus = (build: BuildType) =>
  (<div style={{ color: getBuildColor(build.result), textTransform: 'uppercase' }}>
    {BuildsResult[build.result]}
  </div>)

const renderBuild = (build: BuildType, renderHeader: boolean) => (
  <ListGroupItem className={'first-item'} style={{ borderLeft: `5px solid ${getBuildColor(build.result)}` }}>
    <Row>
      <Col md={2}>
        {renderHeader &&
          <div className="header-column">
            Latest Katana builds
          </div>
        }
      </Col>
      <Col md={9}>
        <Row>
          <Col md={4}>
            {subHeader('Status:')}
            <div>
              {renderBuildStatus(build)}
              {renderBuildTime(build)}
            </div>
          </Col>
          <Col md={7}>
            <div>
              <div>
                {subHeader('Build name:')}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={buildKatanaBuildLink(build.builder.project, build.builder.name, build.number)}
                >
                  <span>{build.builder.friendlyName}</span>
                </a>
                <div className="sub-info">{`(build number #${build.number})`}</div>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </ListGroupItem>
)
class Builds extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
    }
  }
  props: PropsType

  state: {
    expanded: boolean
  }

  render() {
    if (!this.props.builds || !this.props.builds.length) {
      return null
    }
    return (
      <div>
        {this.props.builds.map((build, i) => renderBuild(build, i === 0))}
      </div>
    )
  }
}

export const structuredSelector = createStructuredSelector({
  builds: getBuilds,
  abvBuild: getABVBuild,
})

export default connect(structuredSelector)(Builds)
