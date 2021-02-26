import * as R from 'ramda'

import { limits, normalize } from './arrayHelppers'
import { findSuitableTracksByKey, keyDistance } from './keys'
import { promiseOrTimeout } from './promiseHelpers'
import { penaltyFn } from './penalties'
import * as seedrandom from 'seedrandom'

export const graphWalk = async ({
  tracks,
  intro,
  outro,
  targetLength,
  penalties,
  tolerance,
  maxTempoDifference,
  seed,
  filterByPenalty = true,
  timeout = 0.5,
}) => {
  console.log({
    tracks,
    intro,
    outro,
    targetLength,
    penalties,
    tolerance,
    maxTempoDifference,
    seed,
    filterByPenalty,
    timeout,
  })
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

  const calculateTempoDifference = (t1, t2) => {
    const normalDiff = Math.abs(1 - Math.min(t1.tempo, t2.tempo) / Math.max(t1.tempo, t2.tempo))
    const scaledDiff = Math.abs(1 - (Math.min(t1.tempo, t2.tempo) * 2) / Math.max(t1.tempo, t2.tempo))
    return Math.min(normalDiff, scaledDiff) * 100
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
        const atTargetLength = node.currentLength === targetLength - (outro === undefined ? 1 : 2)
        const suitableTracks = atTargetLength
          ? undefined
          : findSuitableTracksByKey(node.track, tracksLeft)
              .filter((t) => calculateTempoDifference(node.track, t) < maxTempoDifference)
              .filter((t) => !filterByPenalty || calculatePenalty(node.currentLength + 1, t) < tolerance)

        if (atTargetLength) {
          if (currentPenalty < bestRoute.penalty) {
            let path = []
            let currentNode = node
            while (currentNode !== null) {
              path.push(currentNode.track)
              currentNode = currentNode.previous
            }

            let reversedPath = R.reverse(path)
            bestRoute = {
              penalty: currentPenalty,
              path: outro === undefined ? reversedPath : [...reversedPath, outro],
            }

            routes.splice(0, 0, bestRoute)

            console.log(`Found path with penalty: ${currentPenalty}`)
          }
        }

        const tooFarFromOutro =
          outro !== undefined && keyDistance(false)(node.track, outro) > targetLength - node.currentLength - 3

        if (
          tooFarFromOutro ||
          atTargetLength ||
          suitableTracks.length === 0 ||
          (filterByPenalty && node.currentPenalty > bestRoute.penalty)
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
