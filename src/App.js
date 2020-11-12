import './App.css'
import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import * as R from 'ramda'
import { Button } from '@material-ui/core'

import defaultTracklist from './test/tracklist.js'
import Tracklist from './Tracklist'
import parseTracklist from './lib/parseTracklist.js'
import { graphWalk } from './lib/graphWalk.js'
import { saw } from './lib/penalties.js'
import { limits, normalize } from './lib/arrayHelppers'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'

function App() {
  const [tracklist, setTracklist] = useState(defaultTracklist)
  const [tracks, setTracks] = useState(parseTracklist(tracklist))
  const [path, setPath] = useState([])
  const [energy, setEnergy] = useState([])
  const [targetLength, setTargetLength] = useState(20)
  let energyFunction = saw(6)
  const [energyTarget, setEnergyTarget] = useState([])
  const [processing, setProcessing] = useState(false)
  const [editing, setEditing] = useState(true)

  return (
    <Container maxWidth="m">
      <h1>Mixtape planner</h1>
      <p>
        A tool for generating a mixtape tracklist where all transitions are in key. Start by copying a playlist exported
        from Traktor as a web page and pasting it to the box below. The first track will be used as the intro track.
      </p>
      <p>
        Please note that the algorithm will currently always return the same output for a given input. If you want
        another order as output, you can try to rearrange the tracks in the playlist. The algorithm will also probably
        find a couple of possible tracklist orders, but the UI currently only shows the best ranked one.
      </p>
      <h2>Playlist</h2>
      <p>
        {editing ? (
          <>
            <p>
              <TextField
                fullWidth={true}
                rowsMax={20}
                multiline
                onChange={(e) => {
                  setTracklist(e.target.value)
                }}
                value={tracklist}
              />
            </p>
            <p>
              <Button
                disabled={processing}
                onClick={() => {
                  setEditing(false)
                  setTracks(parseTracklist(tracklist))
                }}
                color="primary"
                variant="contained"
              >
                Parse tracklist
              </Button>
            </p>
          </>
        ) : (
          <>
            <p>
              <Tracklist tracks={tracks} />
            </p>
            <p>
              <Button disabled={processing} onClick={() => setEditing(true)} color="primary" variant="contained">
                Edit playlist
              </Button>
            </p>
          </>
        )}
      </p>
      <p>
        <Button
          color="primary"
          variant="contained"
          disabled={processing || editing}
          onClick={async () => {
            setProcessing(true)
            setEnergyTarget([])
            setEnergy([])
            setPath([])
            const paths = await graphWalk({
              tracks,
              intros: tracks.slice(0, 1),
              targetLength,
              penalties: { energy: { weight: 1, fn: energyFunction } },
            })

            const bestPath = paths[0].path

            const energyRange = limits(R.map(R.path(['properties', 'energy']), bestPath))
            const getEnergyTarget = ({ min, max }) =>
              normalize(min, max)(R.range(0, targetLength).map((i) => energyFunction(i)))
            setEnergyTarget(getEnergyTarget(energyRange))
            setEnergy(bestPath.map(R.path(['properties', 'energy'])))
            setPath(bestPath)
            setProcessing(false)
          }}
        >
          {processing && !editing ? 'Calculating...' : 'Calculate order'}
        </Button>
      </p>
      {path.length !== 0 ? (
        <>
          <h2>Generated tracklist</h2>
          <p>
            <Tracklist tracks={path} />
          </p>
          <h2>Correlation with property function</h2>
          <p>
            <Chart
              options={{
                chart: {
                  id: 'apexchart-example',
                },
                xaxis: {
                  categories: R.range(1, targetLength),
                },
              }}
              series={[
                {
                  name: 'energy',
                  data: energy.map(Math.round),
                },
                {
                  name: 'energy target',
                  data: energyTarget.map(Math.round),
                },
              ]}
              width="500"
              height="320"
            />
          </p>
        </>
      ) : null}
    </Container>
  )
}

export default App
