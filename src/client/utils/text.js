/* @flow */

export const pluralizedText = (singular: string, plural: string, number: number) =>
  `${number} ${number === 1 ? singular : plural}`
