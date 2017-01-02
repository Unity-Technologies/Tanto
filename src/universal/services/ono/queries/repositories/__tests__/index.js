import {
  queries,
  parseRepositories,
  query,
} from 'services/ono/queries/repositories'

import chai from 'chai'

const expect = chai.expect

describe('services repositories query parsers', () => {
  const repos = [
    { id: 1, name: 'name1', description: 'description1' },
    { id: 2, name: 'name2', description: 'description2' },
    { id: 3, name: 'name3', description: 'description3' }]

  const groups = [
    { id: 11, name: 'group1', description: 'group1description1' },
    { id: 12, name: 'group2', description: 'group2description2' },
  ]

  it('parseCurrentUserPullRequests should parse the first level group', () => {
    const response = {
      data:
      {
        group: {
          repositories: { nodes: repos },
          groups,
        },
      },
    }
    expect(parseRepositories(response)).to.be.eql({ repositories: repos, groups })
  })

  it('parseCurrentUserPullRequests should parse the nested level repositories and groups', () => {
    const response = {
      data:
      {
        repositories: { nodes: repos },
        groups,
      },
    }
    expect(parseRepositories(response)).to.be.eql({ repositories: repos, groups })
  })

  it('query returns TOPLEVEL_REPOSITORIES_QUERY for empty group name arguent', () => {
    expect(query('')).to.be.eql(queries.TOPLEVEL_REPOSITORIES_QUERY)
    expect(query()).to.be.eql(queries.TOPLEVEL_REPOSITORIES_QUERY)
    expect(query(null)).to.be.eql(queries.TOPLEVEL_REPOSITORIES_QUERY)
  })

  it('query returns REPOSITORIES_QUERY for empty group name arguent', () => {
    expect(query('somegroup')).to.be.eql(queries.REPOSITORIES_QUERY)
  })
})
