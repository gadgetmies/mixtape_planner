import * as R from 'ramda'

import { limits, normalize } from './arrayHelppers'
import { findSuitableTracks, keyDistance } from './keys'
import { promiseOrTimeout } from './promiseHelpers'
import { penaltyFn } from './penalties'
import * as seedrandom from 'seedrandom'

export const graphWalk = async ({ tracks, intro, outro, targetLength, penalties, tolerance, seed, timeout = 0.5 }) => {
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

  let routes = []
  let bestRoute = {
    path: [],
    penalty: Infinity,
  }

  const iterate = (node, outro, tracksLeft) => {
    return new Promise((accept) =>
      setImmediate(async () => {
        const penalty = calculatePenalty(node.currentLength, node.track)
        const currentPenalty = node.currentPenalty + penalty
        const atTargetLength = node.currentLength === targetLength - 2
        const suitableTracks = atTargetLength
          ? undefined
          : findSuitableTracks(node.track, tracksLeft).filter(
              (t) => calculatePenalty(node.currentLength + 1, t) < tolerance
            )

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
              path: [...R.reverse(path), outro],
            }

            routes.splice(0, 0, bestRoute)

            console.log(`Found path with penalty: ${currentPenalty}`)
          }
        }

        const tooFarFromOutro = keyDistance(false)(node.track, outro) > targetLength - node.currentLength - 3

        if (
          tooFarFromOutro ||
          atTargetLength ||
          suitableTracks.length === 0 ||
          node.currentPenalty > bestRoute.penalty
        ) {
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
            outro,
            R.without([t], tracksLeft)
          )
        }

        return accept()
      })
    )
  }

  const graphStart = Date.now()

  await promiseOrTimeout(
    () =>
      iterate(
        {
          previous: null,
          track: intro,
          currentLength: 0,
          currentPenalty: 0,
        },
        outro,
        R.without([intro, outro], tracks).sort(() => seedrandom(seed) - 0.5)
      ),
    timeout * 60 * 1000
  )

  const graphTime = Date.now() - graphStart

  console.log('Graph done')
  console.log(`Tracks: ${tracks.length}, Graph time: ${graphTime}`)

  return routes
}
