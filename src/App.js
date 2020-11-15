import './App.css'
import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import * as R from 'ramda'
import { Button, ButtonGroup } from '@material-ui/core'

import defaultTracklist from './test/tracklist.js'
import Tracklist from './Tracklist'
import parsePlaylist from './lib/parseTracklist.js'
import { graphWalk } from './lib/graphWalk.js'
import { absoluteSine, saw } from './lib/penalties.js'
import { limits, normalize } from './lib/arrayHelppers'

import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Slider from '@material-ui/core/Slider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import Input from '@material-ui/core/Input'
import GithubCorner from 'react-github-corner'

import { raisingSaw } from './lib/penalties'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

function App() {
  const [tracklist, setTracklist] = useState(defaultTracklist)
  const [tracks, setTracks] = useState(parsePlaylist(tracklist))
  const [paths, setPaths] = useState([])
  const [selectedPath, setSelectedPath] = useState(undefined)
  const [targetLength, setTargetLength] = useState(7)
  const [timeout, setTimeout] = useState(2)
  const [tolerance, setTolerance] = useState(1.5)
  const [processing, setProcessing] = useState(false)
  const [editingPlaylist, setEditingPlaylist] = useState(true)
  const [editingIntro, setEditingIntro] = useState(false)
  const [editingOutro, setEditingOutro] = useState(false)
  const [intro, setIntro] = useState(tracks[0])
  const [outro, setOutro] = useState(R.last(tracks))
  const [parametersChanged, setParametersChanged] = useState(true)
  const [seed, setSeed] = useState(0)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [targetValues, setTargetValues] = useState(
    [8, 8, 9, 9, 2, 3, 6, 9, 10, 5, 6, 7, 10, 10, 6, 7, 8, 9, 10, 10].map((value) => ({ value }))
  )
  const [processingMessage, setProcessingMessage] = useState('')

  const targetFunctions = [
    {
      name: 'Raising Saw',
      fn: raisingSaw(7, targetLength),
    },
    {
      name: 'Saw',
      fn: saw(7),
    },
    {
      name: 'Absolute sine',
      fn: absoluteSine,
    },
    {
      name: 'Manual',
      fn: (i) => targetValues[i].value,
    },
  ]
  const [targetFn, setTargetFn] = useState(targetFunctions[0])

  const firstProperty = (track) => R.path([0], Object.entries(track.properties))
  const firstPropertyName = (track) => R.path([0], firstProperty(track))
  const firstPropertyValue = (track) => R.path([1], firstProperty(track))
  const parameterRange = limits(R.map(firstPropertyValue, tracks))
  const getTargetValues = ({ min, max }, targetLength, fn) => {
    return normalize(min, max)(R.range(0, targetLength).map((i) => fn(i)))
  }
  const [cachedTargetValues, setCachedTargetValues] = useState(
    getTargetValues(parameterRange, targetLength, targetFn.fn)
  )

  return (
    <>
      <Container maxWidth="md">
        <h1>Mixtape Planner</h1>
        <p>
          There are a huge number of ways to arrange tracks and finding just the right one that matches the mood you are
          after can be a burden. Want to go from one track to another, but just cannot seem to find the right tracks to
          put in between them? This is just the right tool for the job!
        </p>
        <p>
          Start by dropping a list of tracks below, selecing the track to start from, the track to end up at and the
          mood you are after. Let the planner work its magic and prepare to be amazed by the combinations it spits out!
        </p>
        <h2>Parameters</h2>
        <h3>
          Playlist{' '}
          <Button
            size="small"
            disabled={processing}
            onClick={() => {
              if (editingPlaylist) {
                setEditingPlaylist(false)
                const parsedPlaylist = parsePlaylist(tracklist)
                setTracks(parsedPlaylist)
                setParametersChanged(true)
                setIntro(parsedPlaylist.find(R.equals(intro)))
                setOutro(parsedPlaylist.find(R.equals(outro)))
              } else {
                setEditingPlaylist(true)
              }
            }}
            color="primary"
            variant="contained"
          >
            {editingPlaylist ? 'Parse' : 'Import / Edit'}
          </Button>
        </h3>
        {editingPlaylist ? (
          <>
            <p>
              The planner is rather picky about the input it gets currently (a TSV formatted text with Artist, Title,
              Key and Comment columns). In order to produce such a file do the following:
            </p>
            <p>
              Export a playlist from Traktor as a web page. Include the Artist, Title, Key (or Key Text) and Comment
              columns. The planner uses the Comment column as input for the mood (target curve). The column can contain
              other data as well, but it needs to end with a number. If you are using Mixed in Key, you can configure it
              to write the energy level to the comment tag (Settings > Update Tags > Where to write it > Overwrite
              comments). After exporting the playlist, open the web page and copy and paste the contents (including the
              headers) into the field below. Then click the Parse button above and if everything goes well, you are
              ready to start generating interesting track combinations!
            </p>
            <TextField
              fullWidth={true}
              rowsMax={20}
              multiline
              variant="outlined"
              onChange={(e) => {
                setTracklist(e.target.value)
              }}
              value={tracklist}
            />
          </>
        ) : (
          <>
            <h4>
              First track{' '}
              <Button
                disabled={processing}
                size="small"
                color="primary"
                variant="contained"
                onClick={() => setEditingIntro(!editingIntro)}
              >
                {editingIntro ? 'Done' : 'Edit'}
              </Button>
            </h4>
            <Tracklist
              tracks={editingIntro ? tracks : [intro].filter(R.identity)}
              key="intro"
              editing={editingIntro}
              disabled={processing}
              onTrackSelected={(i) => {
                setIntro(tracks[i])
                setParametersChanged(true)
              }}
              selectedTrackIndex={tracks.findIndex(R.equals(intro))}
            />
            <h4>
              Last track{' '}
              <Button
                disabled={processing}
                size="small"
                color="primary"
                variant="contained"
                onClick={() => setEditingOutro(!editingOutro)}
              >
                {editingOutro ? 'Done' : 'Edit'}
              </Button>
            </h4>
            <Tracklist
              tracks={editingOutro ? tracks : [outro].filter(R.identity)}
              key="outro"
              editing={editingOutro}
              disabled={processing}
              onTrackSelected={(i) => {
                setOutro(tracks[i])
                setParametersChanged(true)
              }}
              selectedTrackIndex={tracks.findIndex(R.equals(outro))}
            />
            <h4>Rest</h4>
            <Tracklist tracks={R.without([intro, outro], tracks)} key="middle" />
          </>
        )}
        {editingPlaylist ? null : (
          <>
            <h3>Number of tracks between first and last</h3>
            <Slider
              min={3}
              max={30}
              valueLabelDisplay="on"
              value={targetLength - 2}
              disabled={processing}
              style={{ marginTop: 20 }}
              onChange={(_, value) => {
                setTargetLength(value + 2)
                setParametersChanged(true)
              }}
            />
            <h3>Target curve</h3>
            <Select
              value={targetFn.name}
              disabled={processing}
              onChange={(e) => {
                setTargetFn(targetFunctions.find(R.propEq('name', e.target.value)))
                setParametersChanged(true)
              }}
            >
              {targetFunctions.map(({ name }) => (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {targetFn.name === 'Manual' ? (
              <>
                <h4>Values</h4>
                {R.range(0, targetLength).map((i) => (
                  <>
                    {i !== 0 && i % 10 === 0 ? <br /> : null}
                    <TextField
                      size="small"
                      variant="outlined"
                      style={{ width: 60, marginBottom: 10 }}
                      label={(i + 1).toString()}
                      key={i}
                      value={targetValues[i].value}
                      onChange={(e) => {
                        targetValues[i].value = R.clamp(0, 10, parseInt(e.target.value) || 0)
                        setTargetValues([...targetValues])
                        setParametersChanged(true)
                      }}
                    />
                  </>
                ))}
              </>
            ) : null}
            <Chart
              options={{
                chart: {
                  id: 'apexchart-example',
                },
                xaxis: {
                  categories: R.range(1, targetLength + 1),
                },
              }}
              series={[
                {
                  name: 'energy target',
                  data: getTargetValues(parameterRange, targetLength, targetFn.fn),
                },
              ]}
              height="200"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showAdvancedOptions}
                  onChange={() => {
                    setShowAdvancedOptions(!showAdvancedOptions)
                  }}
                />
              }
              label="Show advanced options"
            />
            {showAdvancedOptions ? (
              <>
                <h3>Processing timeout (minutes)</h3>
                <Slider
                  min={0.5}
                  max={5}
                  step={0.1}
                  valueLabelDisplay="on"
                  value={timeout}
                  disabled={processing}
                  onChange={(_, value) => {
                    setTimeout(value)
                    setParametersChanged(true)
                  }}
                />
                <h4>Tolerance</h4>
                <Slider
                  min={0.0}
                  max={3.0}
                  step={0.1}
                  valueLabelDisplay="on"
                  value={tolerance}
                  disabled={processing}
                  onChange={(_, value) => {
                    setTolerance(Number(value))
                    setParametersChanged(true)
                  }}
                />
                <h4>Seed</h4>
                <Input
                  size="small"
                  value={seed}
                  disabled={processing}
                  onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                />
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disabled={processing}
                  onClick={() => {
                    setSeed(Math.round(Math.random() * 1000000))
                    setParametersChanged(true)
                  }}
                >
                  Generate seed
                </Button>
              </>
            ) : null}
            <h2 id="result">Result</h2>
            <p>
              <Button
                color="primary"
                variant="contained"
                disabled={
                  !intro || !outro || (!parametersChanged && paths.length !== 0) || processing || editingPlaylist
                }
                onClick={async () => {
                  setProcessing(true)
                  setPaths([])
                  setProcessingMessage('')

                  document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'end' })

                  const paths = await graphWalk({
                    tracks,
                    intro,
                    outro,
                    targetLength,
                    tolerance,
                    timeout,
                    seed,
                    penalties: { [firstPropertyName(tracks[0])]: { weight: 1, fn: targetFn.fn } },
                  })

                  setCachedTargetValues(getTargetValues(parameterRange, targetLength, targetFn.fn))
                  setParametersChanged(false)
                  setPaths(paths)
                  setSelectedPath(paths[0])
                  setProcessing(false)

                  setProcessingMessage(
                    paths.length === 0 ? 'No suitable orders found. Try increasing processing timeout or tolerance' : ''
                  )
                }}
              >
                Generate order
              </Button>
            </p>
            {processingMessage ? <p>{processingMessage}</p> : null}
            {processing ? (
              <>
                <p>Calculating...</p>
                <CircularProgress />
              </>
            ) : null}
            <div style={{ minHeight: 100 }}>
              {!processing && paths.length !== 0 ? (
                <>
                  <ButtonGroup color="primary" variant="contained">
                    {paths.map((path, i) => (
                      <Button
                        key={i}
                        color={path === selectedPath ? 'secondary' : 'primary'}
                        onClick={() => setSelectedPath(path)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </ButtonGroup>
                  <h3>Tracklist</h3>
                  <Tracklist tracks={selectedPath.path} />
                  <h3>Correlation with target curve ({Math.round(selectedPath.penalty * 100) / 100})</h3>
                  <Chart
                    options={{
                      chart: {
                        id: 'apexchart-example',
                      },
                      xaxis: {
                        categories: R.range(1, targetLength + 1),
                      },
                    }}
                    series={[
                      {
                        name: 'Value',
                        data: selectedPath.path.map(firstPropertyValue),
                      },
                      {
                        name: 'Target',
                        data: cachedTargetValues,
                      },
                    ]}
                    height="200"
                  />
                  <h3>Keys</h3>
                  <Chart
                    options={{
                      chart: {
                        id: 'apexchart-example',
                      },
                      xaxis: {
                        categories: R.range(1, targetLength + 1),
                      },
                    }}
                    series={[
                      {
                        name: 'key',
                        data: selectedPath.path.map(R.prop('keyNumber')),
                      },
                    ]}
                    height="200"
                  />
                </>
              ) : null}
            </div>
          </>
        )}
      </Container>
      <GithubCorner href="https://github.com/gadgetmies/mixtape_planner" target="_blank" />
    </>
  )
}

export default App
