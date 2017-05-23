import chai from 'chai'
import { helpers } from 'routes/helpers'

const expect = chai.expect

describe('routes helpers', () => {
  it('groupPathFromPath should handle empty string', () => {
    expect(helpers.groupPathFromPath('')).equals('')
  })

  it('groupPathFromPath should handle string without "projects"', () => {
    expect(helpers.groupPathFromPath('/some/other/path')).equals('/some/other/path')
  })

  it('groupPathFromPath should replace "projects" with empty string', () => {
    expect(helpers.groupPathFromPath('/projects')).equals('')
  })

  it('groupPathFromPath should not replace "projects" in the middle of the string', () => {
    expect(helpers.groupPathFromPath('/test/projects')).equals('/test/projects')
  })

  it('groupPathFromPath should replace "projects" in the beginning of the string', () => {
    expect(helpers.groupPathFromPath('/projects/test/group')).equals('test/group')
  })

  it('buildPullRequestLink', () => {
    expect(helpers.buildPullRequestLink('projectname', '1234'))
      .equals('/project/projectname/pullrequest/1234')
  })

  it('buildProjectLink with group', () => {
    expect(helpers.buildProjectLink('projectname', 'group1/subgroup'))
      .equals('/project/group1/subgroup/projectname')
  })

  it('buildProjectLink with group and branch', () => {
    expect(helpers.buildProjectLink('projectname', 'group1/subgroup', 'testbranch'))
      .equals('/project/group1/subgroup/projectname?branch=testbranch')
  })


  it('buildProjectsLink with empty group', () => {
    expect(helpers.buildProjectsLink('projectname', null))
      .equals('/projects/projectname')
  })

  it('breadcrumbItems handles not empty path', () => {
    const path = '/path1/path2/path3'
    const path2 = 'path1/path2/path3/'
    const path3 = 'path1/path2/path3/'
    const exp = [
      { label: 'path1', link: '/path1' },
      { label: 'path2', link: '/path1/path2' },
      { label: 'path3', link: '/path1/path2/path3' },
    ]
    expect(helpers.breadcrumbItems(path)).to.eql(exp)
    expect(helpers.breadcrumbItems(path2)).to.eql(exp)
    expect(helpers.breadcrumbItems(path3)).to.eql(exp)
  })

  it('breadcrumbItems handles empty path', () => {
    expect(helpers.breadcrumbItems('')).to.eql([])
  })

  it('buildKatanaBuildLink', () => {
    const builderName = 'builderName'
    const projectName = 'projectName'
    const number = 12222
    expect(helpers.buildKatanaBuildLink(projectName, builderName, number)).equals(
      `${process.env.KATANA_HOST}/projects/${projectName}/builders/${builderName}/builds/${number}`,
    )
  })
})
