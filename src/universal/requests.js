/**
 * Check HTTP response status
 */
export default function checkHttpStatus(response: any): Object {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Parse JSON response
 */
export function parseJSON(response: any): Object {
  return response.json()
}
