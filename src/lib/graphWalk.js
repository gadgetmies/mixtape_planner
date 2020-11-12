import * as R from 'ramda'

import { limits, normalize } from './arrayHelppers'
import { findSuitableTracks } from './keys'
import { promiseOrTimeout } from './promiseHelpers'
import { penaltyFn } from './penalties'

export const graphWalk = async ({ tracks, intros, targetLength, penalties, timeout = 30 * 1000}) => {
  const minAndMaxValuesForPenalties = Object.fromEntries(
    Object.keys(penalties).map((key) => {
      const values = R.map(R.path(['properties', key]), tracks)
      return [key, limits(values)]
    })
  )

  const penaltyLookup = R.mapObjIndexed((_, key, ps) => {
    const { min, max } = minAndMaxValuesForPenalties[key]

    return {
      weight: ps[key].weight,
      values: normalize(min, max)(R.range(0, targetLength).map((i) => ps[key].fn(i))),
    }
  }, penalties)

  const calculatePenalty = (level, track) => {
    const mapped = Object.keys(penaltyLookup).map((name) => {
      const penaltyObj = penaltyLookup[name]
      return penaltyObj.weight * penaltyFn(penaltyObj.values[level], track.properties[name])
    })
    return R.sum(mapped)
  }

  let bestRoute = {
    path: [],
    penalty: Infinity,
  }

  const iterate = (node, tracksLeft) => {
    return new Promise((accept) =>
      setImmediate(async () => {
        const penalty = calculatePenalty(node.currentLength, node.track)
        const currentPenalty = node.currentPenalty + penalty
        const atTargetLength = node.currentLength === targetLength - 1
        const suitableTracks = atTargetLength
          ? undefined
          : findSuitableTracks(node.track, tracksLeft).filter((t) => calculatePenalty(node.currentLength + 1, t) < 1)

        if (atTargetLength) {
          if (currentPenalty < bestRoute.penalty) {
            let path = []
            let currentNode = node
            while (currentNode !== null) {
              path.push(currentNode.track)
              currentNode = currentNode.previous
            }

            bestRoute = {
              penalty: currentPenalty,
              path: R.reverse(path),
            }

            console.log(`Found path with penalty: ${currentPenalty}`)
          }
        }

        if (atTargetLength || suitableTracks.length === 0 || node.currentPenalty > bestRoute.penalty) {
          return accept()
        }

        let index = 0
        for (const t of suitableTracks) {
          if (node.currentLength === 0) {
            console.log(`${Math.round(index / suitableTracks.length)}%`)
            index++
          }

          await iterate(
            {
              previous: node,
              track: t,
              currentLength: node.currentLength + 1,
              currentPenalty: node.currentPenalty + penalty,
            },
            R.without([t], tracksLeft)
          )
        }

        return accept()
      })
    )
  }

  const graphStart = Date.now()
  for (const intro of intros) {
    console.log(`Intro ${intros.indexOf(intro) + 1}: ${intro.artist} - ${intro.title}`)
    await promiseOrTimeout(
      () =>
        iterate(
          {
            previous: null,
            track: intro,
            currentLength: 0,
            currentPenalty: 0,
          },
          R.without([intro], tracks)
        ),
      timeout
    )
  }

  const graphTime = Date.now() - graphStart

  console.log('Graph done')
  console.log(`Tracks: ${tracks.length}, Graph time: ${graphTime}`)

  return [bestRoute]
}
