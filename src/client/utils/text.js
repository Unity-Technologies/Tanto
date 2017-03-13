/* @flow */
import marked from 'marked'

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
})

export const pluralizedText = (singular: string, plural: string, number: number) =>
  (`${number} ${number === 1 ? singular : plural}`)

export function escapeHTML(text: string): string {
  const escape = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    '\'': '&apos;',
  }
  return text.replace(/[&<>"'\\]/g, (char) => escape[char])
}

export function linkifyRevisionHashes(text: string): string {
  return text.replace(/([a-f0-9]{40}|[a-f0-9]{12})/, (hash) => (
    `<a href="${hash}">${hash}</a>`
  ))
}

export function formatOnoText(text: string): string {
  let formatted = escapeHTML(text)
  formatted = formatted.replace(/ @([a-z]+) /g, ' <b>@$1</b> ')
  formatted = linkifyRevisionHashes(formatted)
  // TODO add urlification of urls, revision hashes, and cases
  return formatted
}

export function formatMarkdown(text:string): string {
  let formatted = marked(text)
  formatted = linkifyRevisionHashes(formatted)
  return formatted
}
