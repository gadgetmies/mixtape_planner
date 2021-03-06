export const isSuitableKey = (t1, t2, useConservativeKeyTransitions = false) =>
  Math.abs(t1.keyNumber - t2.keyNumber) % 11 <= 1 &&
  (!useConservativeKeyTransitions || t1.isMinor === t2.isMinor || t1.keyNumber === t2.keyNumber)

export const findSuitableTracksByKey = (current, tracks, useConservativeKeyTransitions = false) => {
  return tracks.filter((t) => isSuitableKey(current, t, useConservativeKeyTransitions))
}

export const keyDistance = (useConservativeKeyTransitions) => (t1, t2) =>
  Math.abs(t1.keyNumber - t2.keyNumber) + (useConservativeKeyTransitions && t1.isMinor !== t2.isMinor ? 1 : 0)

export const getKeyString = (keyNumber, isMinor) => `${keyNumber}${isMinor ? 'B' : 'A'}`
