/* @flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { connect } from 'react-redux'
import { getPullRequestIterations } from 'ducks/pullrequests/selectors'
import { buildPullRequestLink } from 'routes/helpers'
import { Link } from 'react-router'

type IterationType = {
  id: string,
  repositoryName: string,
  title: string,
}
type Props = {
  id: string,
  iterations: Array<IterationType>
}

const Iterations = (props: Props) => {
  if (!props.iterations || !props.iterations.length) {
    return null
  }
  return (
    <ListGroupItem className="summary-item-title">
      <Row>
        <Col md={5}>
          <div className="summary-header-column">
            Iterations
          </div>
        </Col>
        <Col md={7}>
          <div>
            {props.iterations.map(iteration =>
              <div>
                <Link
                  to={buildPullRequestLink(iteration.repositoryName, iteration.id)}
                >
                  {iteration.title}
                </Link>
              </div>)}
          </div>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export default connect((state, props) => ({
  iterations: getPullRequestIterations(state, props),
}))(Iterations)

