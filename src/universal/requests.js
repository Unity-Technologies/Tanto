/* @flow */

export function HttpStatusError(response: Response) {
  this.message = response.statusText
  this.status = response.status
}

export function GraphQlError(errors: Array<{ message: string }>) {
  const firstError = errors && errors[0] && errors[0].message
  this.message = `GraphQlError: '${firstError || '?'}'`
}

export function checkHttpStatus(response: Response): Object {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  throw new HttpStatusError(response)
}

export function parseJSON(response: Response): Object {
  return response.json()
}

export function checkForGraphQlErrors(responseJson: Object): Object {
  if (responseJson && responseJson.errors) {
    throw new GraphQlError(responseJson.errors)
  }
  return responseJson
}
