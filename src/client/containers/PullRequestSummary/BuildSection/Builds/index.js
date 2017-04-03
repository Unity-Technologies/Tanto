/* @flow */

import React, { PureComponent } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { getBuilds, getABVBuild } from 'ducks/bfstats/selectors'
import { buildKatanaBuildLink } from 'routes/helpers'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import moment from 'moment'
import { BuildsResult } from 'universal/constants'
import { connect } from 'react-redux'

import { Column, Table } from 'react-virtualized'
import 'react-virtualized/styles.css'
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
  repository: string,
  revision: string,
  builds: Array<BuildType>,
  abvBuild: BuildType,
}

const subHeader = text => (
  <div className="sub-header">
    {text}
  </div>
)

const successColor = 'green'
const failureColor = '#e63b72'

const renderBuildTime = (build: BuildType) => {
  let finish = build.finish
  if (!finish) {
    finish = moment(build.start).add(build.buildTime, 'm')
  }
  const buildDate = moment(finish)
  return <div style={{ fontSize: '12px' }}>{`${buildDate.format('MMM Do YY, h:mm:ss a')} (${buildDate.fromNow()})`}</div>
}

const getBuildColor = (result: number) => (result === 0 ? successColor : failureColor)

const renderBuildStatus = (build: BuildType) =>
  <div style={{ color: getBuildColor(build.result), textTransform: 'uppercase' }}>
    {BuildsResult[build.result]}
  </div>

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

  resultRenderer = ({
    cellData,
    columnData,
    dataKey,
    isScrolling,
    rowData,
    rowIndex,
  }) => renderBuildStatus(this.props.builds[rowIndex])

  dateRenderer = ({
    cellData,
    columnData,
    dataKey,
    isScrolling,
    rowData,
    rowIndex,
  }) => renderBuildTime(this.props.builds[rowIndex])

  nameRenderer = ({
    cellData,
    columnData,
    dataKey,
    isScrolling,
    rowData,
    rowIndex,
  }) => {
    const build = this.props.builds[rowIndex]
    return (
      <a target="_blank" href={buildKatanaBuildLink(build.builder.project, build.builder.name, build.number)}>
        <span>{build.builder.friendlyName}</span>
      </a>
    )
  }

  toggleBuildsList = () => {
    const expanded = this.state.expanded
    this.setState({ expanded: !expanded })
  }

  render() {
    if (!this.props.abvBuild || !this.props.builds || !this.props.builds.length) {
      return null
    }

    const { abvBuild, builds } = this.props

    return (
      <ListGroupItem style={{ borderLeft: `5px solid ${getBuildColor(abvBuild.result)}` }}>
        <Row>
          <Col md={2}>
            <div className="header-column">
              Latest Katana builds
            </div>
          </Col>
          <Col md={9}>
            <Row>
              <Col md={4}>
                {subHeader('Status:')}
                <div>
                  {renderBuildStatus(abvBuild)}
                  {renderBuildTime(abvBuild)}
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <div>
                    {subHeader('Build name:')}
                    <a target="_blank" href={buildKatanaBuildLink(abvBuild.builder.project, abvBuild.builder.name, abvBuild.number)}>
                      <span>{abvBuild.builder.friendlyName}</span>
                    </a>
                    <div className="sub-info">{`(build number #${abvBuild.number})`}</div>
                  </div>
                </div>
              </Col>
              <Col md={1} />
            </Row>
            {this.state.expanded &&
              <Table
                width={800}
                height={300}
                headerHeight={30}
                rowHeight={40}
                style={{ margin: '10px 0' }}
                rowClassName="builds-table-row"
                rowCount={builds.length}
                rowGetter={({ index }) => builds[index]}
              >
                <Column
                  width={50}
                  style={{ color: '#817f7f' }}
                  label="#"
                  dataKey="number"
                />
                <Column
                  width={500}
                  cellRenderer={this.nameRenderer}
                  label="Build name"
                  dataKey="name"
                />
                <Column
                  width={300}
                  cellRenderer={this.resultRenderer}
                  label="Build result"
                  dataKey="result"
                />

                <Column
                  label="Build date"
                  dataKey="finish"
                  cellRenderer={this.dateRenderer}
                  width={400}
                />
              </Table>
            }
          </Col>
          <Col md={1}>
            <div onClick={this.toggleBuildsList}>
              <i className={`fa ${this.state.expanded ? 'fa-compress' : 'fa-expand'} expand-builds-icon`} aria-hidden="true"></i>
            </div>
          </Col>
        </Row>
      </ListGroupItem>

    )
  }
}

export default connect((state: Object, props: Object) => ({
  builds: getBuilds(state, props),
  abvBuild: getABVBuild(state, props),
}))(Builds)
