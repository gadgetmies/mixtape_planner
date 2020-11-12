export const penaltyFn = (ref, value) => Math.abs(ref - value)
export const saw = riseTime => n => {
  const pos = n / riseTime
  return (pos - Math.floor(pos))
}
export const absoluteSine = n => Math.abs(Math.sin(n / 2))
export const normalizedSine = n => (Math.sin(n) + 1) / 2
