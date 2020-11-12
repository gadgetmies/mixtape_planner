import * as R from 'ramda'

export const limits = values => ({
  min: R.apply(Math.min, values),
  max: R.apply(Math.max, values)
})

export const normalize = (newMin, newMax) => values => {
  const { min: oldMin, max: oldMax } = limits(values)
  return values.map(oldValue => (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin)
}
