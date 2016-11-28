/* @flow */


export default {
  log: (message) => {
    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
      console.log(message)// eslint-disable-line no-console
    }
  },
}
