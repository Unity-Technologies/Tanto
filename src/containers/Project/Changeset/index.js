// TODO: add flow annotations

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { ChangesetFileList, CodeDiffView, ChangesetGroupedList, Divider } from 'components'
import { Button, ButtonGroup } from 'react-bootstrap'
import Scroll from 'react-scroll'
import { PullRequestData, prChangesetList } from '../../../api/testPullRequest'

const Element = Scroll.Element


function Changeset({ params: { hash } }) {
  const openPrButtonStyle = {
    backgroundColor: '#1fb5ad',
    borderColor: '#1fb5ad',
    color: 'white',
  }

  return (
    <div>
      <Helmet title="Changeset" />
      <div>
        <div style={{ fontSize: '20px', float: 'left' }}> Changeset {hash}</div>
        <ButtonGroup style={{ float: 'right' }}>
          <Button style={openPrButtonStyle} />
        </ButtonGroup>
      </div>
      <Element name="files" className="element" >
        <Divider text="Files" />
        <div>
          <ChangesetFileList files={PullRequestData} />
        </div>
      </Element>
      <Element name="changesets" className="element" >
        <Divider text="Changesets" />
        <div>
          <ChangesetGroupedList accordion data={prChangesetList} />
        </div>
      </Element>
      <Element name="diff" className="element" >
        <Divider text="Diff" />
        <div>
          <CodeDiffView files={PullRequestData} />
        </div>
      </Element>
      <Element name="page-bottom" />
    </div>
  )
}

Changeset.propTypes = {
  params: PropTypes.object.isRequired,
}

export default Changeset
