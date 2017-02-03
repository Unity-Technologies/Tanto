import chai from 'chai'
import {
  userEntitiesSelector,
  getUsers,
} from '../index'

const expect = chai.expect

describe('userEntitiesSelector', () => {
  const users =
    {
      1: { id: 1, username: 'testusername1' },
      3: { id: 3, username: 'testusername3' },
      6: { id: 6, username: 'testusername6' },
    }

  it('not empty entities state', () => {
    const state = { entities: { users } }
    expect(userEntitiesSelector(state)).to.eql(users)
  })

  it('empty entities state', () => {
    const state = { entities: {} }
    expect(userEntitiesSelector(state)).to.eql({})
  })

  it('empty users state', () => {
    const state = { entities: { users: {} } }
    expect(userEntitiesSelector(state)).to.eql({})
  })
})


describe('getUsers', () => {
  const users =
    {
      1: { id: 1, username: 'testusername1' },
      3: { id: 3, username: 'testusername3' },
      6: { id: 6, username: 'testusername6' },
    }

  it('not empty entities state', () => {
    const state = { entities: { users } }
    expect(getUsers(state)).to.eql([
      { id: 1, username: 'testusername1' },
      { id: 3, username: 'testusername3' },
      { id: 6, username: 'testusername6' },
    ])
  })

  it('empty entities state', () => {
    const state = { entities: {} }
    expect(getUsers(state)).to.eql([])
  })

  it('empty users state', () => {
    const state = { entities: { users: {} } }
    expect(getUsers(state)).to.eql([])
  })
})
