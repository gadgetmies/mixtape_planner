export const isSuitableKey = (t1, t2, useConservativeKeyTransitions = false) => Math.abs(t1.keyNumber - t2.keyNumber) % 11 <= 1 &&
  (!useConservativeKeyTransitions || (t1.isMinor === t2.isMinor || t1.keyNumber === t2.keyNumber))

export const findSuitableTracks = (current, tracks, useConservativeKeyTransitions = false) => {
  return tracks.filter(t => isSuitableKey(current, t, useConservativeKeyTransitions))
}

export const getKeyString = (keyNumber, isMinor) => `${keyNumber}${isMinor ? 'A' : 'B'}`
