/* @flow */

import React from 'react'
import Helmet from 'react-helmet'
// import Button from 'react-bootstrap/lib/Button'
// import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
// import Scroll from 'react-scroll'

// import ChangesetFileList from 'components/ChangesetFileList'
// import CodeDiffView from 'components/CodeDiffView'
// import ChangesetGroupedList from 'components/ChangesetGroupedList'
// import Divider from 'components/Divider'
// import { PullRequestData, prChangesetList } from '../../../api/testPullRequest'

// const Element = Scroll.Element

export type Props = {
  params: {
    hash: string,
  }
};

function Changeset({ params: { hash } }: Props) {
  // const openPrButtonStyle = {
  //   backgroundColor: '#1fb5ad',
  //   borderColor: '#1fb5ad',
  //   color: 'white',
  // }

  return (
    <div>
      <Helmet title="Changeset" />
      {/* <div>
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
      <Element name="page-bottom" /> */}
    </div>
  )
}

export default Changeset
