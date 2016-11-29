/* @flow */

export default {
  log: (message: string) => {
    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
      console.log(message)// eslint-disable-line no-console
    }
  },
}
