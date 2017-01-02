/* @flow */

export default (literals: Array<string>, ...substitutions: Array<string>) => {
  let interpolation = ''

  for (let i = 0; i < substitutions.length; i += 1) {
    interpolation += literals[i] + substitutions[i]
  }

  interpolation += literals[literals.length - 1]
  interpolation = interpolation.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, '').trim()
  return interpolation
}
