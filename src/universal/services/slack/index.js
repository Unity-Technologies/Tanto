/* @flow */
import 'isomorphic-fetch'
import { routes } from 'universal/constants'
import { checkHttpStatus, parseJSON } from 'universal/requests'

export function SlackErrorOrWarning(type: string, message: string) {
  this.message = `Slack ${type}: '${message || '?'}'`
}

export function checkForSlackErrors(responseJson: Object): Object {
  if (responseJson) {
    if (responseJson.error) {
      throw new SlackErrorOrWarning('Error', responseJson.error)
    }
    if (responseJson.warning) {
      throw new SlackErrorOrWarning('Warning', responseJson.warning)
    }
  }
  return responseJson
}

export function getSlackAvatars() {
  return fetch(routes.SLACK_API_ROUTE, { credentials: 'same-origin' })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(checkForSlackErrors)
}
