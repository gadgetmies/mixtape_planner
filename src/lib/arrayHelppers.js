import * as R from 'ramda'

export const limits = values => ({
  min: R.apply(Math.min, values),
  max: R.apply(Math.max, values)
})

export const getPropertyLimits = (property, values) => limits(values.map(R.path(['properties', property])))

export const normalize = (newMin, newMax, range = undefined) => values => {
  const { min: oldMin, max: oldMax } = range || limits(values)
  return values.map(oldValue => (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin)
}
