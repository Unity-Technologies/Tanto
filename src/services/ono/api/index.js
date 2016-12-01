import 'isomorphic-fetch'
import { routes } from 'universal/constants'
import { checkHttpStatus, parseJSON } from 'universal/requests'

// /**
//  * Posts the data. Data object has the same format as 'fetch' accepts
//  * @param  {[type]} data - accepts the FormData object
//  * @return {[type]}      [description]
//  */
// export function post(query) {
//   return fetch(url, {
//     mode: 'no-cors',
//     method: 'post',
//     body: query,
//     headers: new Headers({
//       'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
//       Accept: 'application/json',
//     }),
//   })
// }

/**
 * Fetches the data. Data object has the same format as 'fetch' accepts
 * @param  {[type]} query - accepts the FormData object
 * @return {[type]}      [description]
 */
export function get(query: string): Object {
  const encodedQuery = encodeURIComponent(query)
  const url = `${routes.ONO_API_ROUTE}?query=${encodedQuery}`

  return fetch(url, { credentials: 'same-origin' })
    .then(checkHttpStatus)
    .then(parseJSON)
}

