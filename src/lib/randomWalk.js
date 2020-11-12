import * as R from 'ramda'
import { findSuitableTracks } from './keys'
import { penaltyFn } from './penalties'

export const randomWalk = ({ tracks, intros, targetLength, energyFunction, popularityFunction }) => {
  intros = intros || tracks
  let sequences = []
  const permutationsBeforeExit = 10000

  const energyPenaltyFn = penaltyFn(energyFunction)
  const popularityPenaltyFn = penaltyFn(popularityFunction)

  const findSuitableTrack = (current, tracks) => {
    const suitable = findSuitableTracks(current, tracks)
    if (suitable.length === 0) return undefined
    return suitable[Math.round(Math.random() * (suitable.length - 1))]
  }

  const iterate = (n, sequence, originalTracks, tracksLeft, targetLength) => {
    if (n === targetLength - 1) return
    const nextTrack = findSuitableTrack(tracks[R.last(sequence)], tracksLeft)
    if (nextTrack === undefined) return
    sequence.push(tracks.indexOf(nextTrack))
    iterate(n + 1, sequence, originalTracks, R.without([nextTrack], tracksLeft), targetLength)
  }

  for (const intro of intros) {
    let permutations = 0
    const first = tracks.indexOf(intro)
    const triedWithCurrentIntro = []

    while (permutations < permutationsBeforeExit) {
      const sequence = [first]
      iterate(0, sequence, tracks, R.without([intro], tracks), targetLength)

      if (!triedWithCurrentIntro.find(R.equals(sequence))) {
        triedWithCurrentIntro.push(sequence)
        permutations++
      } else {
        console.log('duplicate', permutations)
      }
    }

    sequences = sequences.concat(triedWithCurrentIntro)
  }

  const sequencesWithPenalties = sequences.map(order => {
    const penalty = order.reduce((acc, n, i) => ({
      energy: acc.energy + energyPenaltyFn(i, tracks[n].energy),
      popularity: acc.popularity + popularityPenaltyFn(i, tracks[n].popularity)
    }), { energy: 0, popularity: 0 })
    return { order, penalty }
  })

  const sortedSequences = R.sortBy(({ penalty: { energy, popularity } }) => 3 * energy + popularity, sequencesWithPenalties).slice(-10)

  const separator = '\t'

  console.log('orders\n', sortedSequences.map(({ penalty, order }) => `${3 * penalty.energy + penalty.popularity}\t${order.join(separator)}`).join('\n'))
  console.log('keys\n', sortedSequences.map(s => s.order.map(n => tracks[n].keyNumber).join(separator)).join('\n'))
  console.log('energies\n', tracks.map((_, i) => energyFunction(i)).join(separator),
    sortedSequences.map(t => t.order.map(n => tracks[n].energy).join(separator)).join('\n'))
  console.log('popularities\n', tracks.map((_, i) => popularityFunction(i)).join(separator),
    sortedSequences.map(t => t.order.map(n => tracks[n].popularity).join(separator)).join('\n'))
}
