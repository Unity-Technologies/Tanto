import chai from 'chai'

import { escapeHTML, linkifyRevisionHashes,
         formatOnoText, formatMarkdown } from '../text.js'

const expect = chai.expect

describe('escapeHTML', () => {
  it('should escape all HTML literals', () => {
    const before = '<script>malicious script</script>'
    const after = '&lt;script&gt;malicious script&lt;/script&gt;'

    expect(escapeHTML(before)).to.eql(after)
  })
})


describe('linkifyRevisionHashes', () => {
  it('should turn short revision hashes into links', () => {
    const before = 'bla bla ec6dbd3d8f5a bla bla'
    const after = 'bla bla <a href="ec6dbd3d8f5a">ec6dbd3d8f5a</a> bla bla'

    expect(linkifyRevisionHashes(before)).to.eql(after)
  })

  it('should turn long revision hashes into links', () => {
    const before = 'bla bla c1d17ecfc8a932ad6c2cbdf0e734002676f07c0f bla bla'
    const after = 'bla bla <a href="c1d17ecfc8a932ad6c2cbdf0e734002676f07c0f">c1d17ecfc8a932ad6c2cbdf0e734002676f07c0f</a> bla bla'

    expect(linkifyRevisionHashes(before)).to.eql(after)
  })

  it('should not turn modify invalid hashes', () => {
    const before = 'bla bla ec6zbd3d8f5a bla bla'
    expect(linkifyRevisionHashes(before)).to.eql(before)
  })
})

describe('formatOnoText', () => {
  it('should bold mentions', () => {
    const before = 'text @username text'
    const after = 'text <b>@username</b> text'

    expect(formatOnoText(before)).to.eql(after)
  })

  it('should not bold emails', () => {
    const before = 'text email@example.com text'

    expect(formatOnoText(before)).to.eql(before)
  })
})

describe('formatMarkdown', () => {
  it('should turn short revision hashes into links', () => {
    const before = 'bla bla ec6dbd3d8f5a bla bla'
    const after = '<p>bla bla <a href="ec6dbd3d8f5a">ec6dbd3d8f5a</a> bla bla</p>\n'
    expect(formatMarkdown(before)).to.eql(after)
  })

  it('should also escape HTML literals', () => {
    const before = '<script>malicious script</script>'
    const after = '<p>&lt;script&gt;malicious script&lt;/script&gt;</p>\n'

    expect(formatMarkdown(before)).to.eql(after)
  })
})
