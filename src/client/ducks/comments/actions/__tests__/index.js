import chai from 'chai'
import { editCommentNormalizer } from '../index.js'
import { comment as commentSchema } from 'ducks/schema'
import { APPEND_ENTITY } from 'ducks/entities'

const expect = chai.expect


describe('editCommentNormalizer', () => {
  it('should return an APPEND_ENTITY action with correct parameters', () => {
    const comment = { id: 4, text: 'test' }
    const response = { editComment: { comment } }

    const expectedAction = {
      type: APPEND_ENTITY,
      object: comment,
      sourcePath: ['comments'],
      referencePaths: [],
      schema: commentSchema,
    }

    expect(editCommentNormalizer(response)).to.eql(expectedAction)
  })

  it('should return nothing when there was no comment', () => {
    const response = {}

    expect(editCommentNormalizer(response)).to.eql(null)
  })
})
