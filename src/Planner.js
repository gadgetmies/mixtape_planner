import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import * as R from 'ramda'
import { OAuth2AuthCodePKCE } from '@bity/oauth2-auth-code-pkce'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, ButtonGroup } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Tracklist from './Tracklist'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Chart from 'react-apexcharts'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import GithubCorner from 'react-github-corner'

import { graphWalk } from './lib/graphWalk'
import defaultPlaylist from './test/playlist'
import parsePlaylist from './lib/parseTracklist'
import defaultTracklist from './test/tracklist'
import { absoluteSine, raisingSaw, saw } from './lib/penalties'
import { limits, normalize } from './lib/arrayHelppers'
import pathToTSV from './lib/pathToTSV'
import TracklistInstructions from './TracklistInstructions'
import pitchClassToCamelotKeyNumber from './lib/pitchClassToCamelotKeyNumber'

const minimumTrackCountForPenalties = 50

const firstProperty = (track) => R.path([0], Object.entries(track.properties))
const firstPropertyName = (track) => R.path([0], firstProperty(track))
const firstPropertyValue = (track) => R.path([1], firstProperty(track))
const getTargetValues = ({ min, max }, targetLength, fn) => {
  return normalize(min, max)(R.range(0, targetLength).map((i) => fn(i)))
}

const truncate = (length) => (input) => (input.length > length ? `${input.substring(0, length)}...` : input)
const truncateTitle = truncate(10)

let oauth
let spotify

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  buttonRow: {
    display: 'inline-block',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const Planner = () => {
  const [tracklist, setTracklist] = useState(defaultPlaylist)
  const [tracks, setTracks] = useState(parsePlaylist(tracklist))
  const [paths, setPaths] = useState([])
  const [selectedPath, setSelectedPath] = useState({ penalty: undefined, path: parsePlaylist(defaultTracklist) })
  const [targetLength, setTargetLength] = useState(5)
  const [timeout, setTimeout] = useState(2)
  const [tolerance, setTolerance] = useState(1.5)
  const [maxTempoDifference, setMaxTempoDifference] = useState(5)
  const [processing, setProcessing] = useState(false)
  const [editingPlaylist, setEditingPlaylist] = useState(false)
  const [editingIntro, setEditingIntro] = useState(false)
  const [editingOutro, setEditingOutro] = useState(false)
  const [intro, setIntro] = useState(tracks[0])
  const [outro, setOutro] = useState(undefined)
  const [parametersChanged, setParametersChanged] = useState(true)
  const [seed, setSeed] = useState(0)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [targetValues, setTargetValues] = useState(
    [8, 8, 9, 9, 2, 3, 6, 9, 10, 5, 6, 7, 10, 10, 6, 7, 8, 9, 10, 10].map((value) => ({ value }))
  )
  const [processingMessage, setProcessingMessage] = useState('')
  const [editingSelectedTracklistResult, setEditingSelectedTracklistResult] = useState(false)
  const [selectedTracklist, setSelectedTracklist] = useState(defaultTracklist)
  const parameterRange = limits(R.map(firstPropertyValue, tracks))
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
  const [targetFn, setTargetFunction] = useState(targetFunctions[0])
  const [cachedTargetValues, setCachedTargetValues] = useState(
    getTargetValues(parameterRange, targetLength, targetFn.fn)
  )
  const [playlistDialogOpen, setPlaylistDialogOpen] = React.useState(false)
  const [selectedSpotifyPlaylist, setSelectedSpotifyPlaylist] = React.useState('')
  const [spotifyPlaylistItems, setSpotifyPlaylistItems] = React.useState([])
  const [importingSpotifyPlaylist, setImportingSpotifyPlaylist] = React.useState(false)

  const initializeAndOpenSpotifyPlaylistDialog = async (accessToken) => {
    spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken.token.value)
    const playlists = await spotify.getUserPlaylists()
    setSpotifyPlaylistItems(playlists.items.map(({ name, id }) => ({ id, name })))

    setPlaylistDialogOpen(true)
  }

  useEffect(() => {
    if (!oauth) {
      oauth = new OAuth2AuthCodePKCE({
        authorizationUrl: `https://accounts.spotify.com/authorize`,
        tokenUrl: `https://accounts.spotify.com/api/token`,
        clientId: '01726eb65f8f4f28a640d74bd65deab1',
        scopes: ['playlist-read-private'],
        redirectUrl: 'http://localhost:3000', // TODO: get from process.env?
        onAccessTokenExpiry(refreshAccessToken) {
          console.log('Expired! Access token needs to be renewed.')
          // alert('We will try to get a new access token via grant code or refresh token.')
          return refreshAccessToken()
        },
        onInvalidGrant(refreshAuthCodeOrRefreshToken) {
          console.log('Expired! Auth code or refresh token needs to be renewed.')
          // alert('Redirecting to auth server to obtain a new auth grant code.')
          //return refreshAuthCodeOrRefreshToken();
        },
      })

      oauth
        .isReturningFromAuthServer()
        .then((hasAuthCode) => {
          if (!hasAuthCode) {
            console.log('Something wrong...no auth code.')
          }
          return oauth.getAccessToken().then((token) => initializeAndOpenSpotifyPlaylistDialog(token))
        })
        .catch((potentialError) => {
          if (potentialError) {
            console.log(potentialError)
          }
        })
    }
  })

  const handlePlaylistDialogClose = () => {
    setPlaylistDialogOpen(false)
  }

  const handlePlaylistSelected = async () => {
    try {
      setImportingSpotifyPlaylist(true)
      const playlist = await spotify.getPlaylist(selectedSpotifyPlaylist)
      const tracksFromPlaylist = playlist.tracks.items.map(({ track: { id, name, artists, popularity } }) => ({
        id,
        artist: artists.map(({ name }) => name).join(', '),
        title: name,
        popularity,
      }))

      const features = await spotify.getAudioFeaturesForTracks(tracksFromPlaylist.map(({ id }) => id))
      let parsedPlaylist = R.zipWith(
        ({ artist, title, popularity }, features) => ({
          artist,
          title,
          keyNumber: pitchClassToCamelotKeyNumber[features.key],
          isMinor: false,
          tempo: features.tempo,
          properties: {
            Energy: Math.round(features.energy * 10),
          },
        }),
        tracksFromPlaylist,
        features.audio_features
      )
      setTracks(parsedPlaylist)

      setEditingPlaylist(false)
      setParametersChanged(true)
      setIntro(parsedPlaylist[0])
      setOutro(undefined)
      setPlaylistDialogOpen(false)
    } finally {
      setImportingSpotifyPlaylist(false)
    }
  }

  const handleSpotifyPlaylistChange = (event) => {
    setSelectedSpotifyPlaylist(event.target.value)
  }

  const classes = useStyles()

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
        <p>
          If giving the task of generating tracklists to a computer feels uncanny, you can use the tool for only
          visualising your plans by heading over to the <a href="#result">Result section</a> and dropping your tracks
          there instead!
        </p>
        <h2>Parameters</h2>
        <h3>Playlist</h3>
        <div className={classes.buttonRow}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            disabled={processing}
            onClick={async () => {
              try {
                const accessToken = await oauth.getAccessToken()
                await initializeAndOpenSpotifyPlaylistDialog(accessToken)
              } catch (e) {
                await oauth.fetchAuthorizationCode()
              }
            }}
          >
            Import from Spotify
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
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
          >
            {editingPlaylist ? 'Parse' : 'Import / Edit TSV'}
          </Button>
        </div>
        <Dialog disableBackdropClick disableEscapeKeyDown open={playlistDialogOpen} onClose={handlePlaylistDialogClose}>
          <DialogTitle>Select playlist</DialogTitle>
          <DialogContent>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">Playlist</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={selectedSpotifyPlaylist}
                  onChange={handleSpotifyPlaylistChange}
                  input={<Input />}
                >
                  <MenuItem value=""></MenuItem>
                  {spotifyPlaylistItems.map(({ id, name }) => (
                    <MenuItem value={id}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePlaylistDialogClose} color="primary" disabled={importingSpotifyPlaylist}>
              Cancel
            </Button>
            <Button
              onClick={handlePlaylistSelected}
              color="primary"
              disabled={selectedSpotifyPlaylist === '' || importingSpotifyPlaylist}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {editingPlaylist ? (
          <>
            <br />
            <br />
            <TracklistInstructions>
              After exporting the playlist, open the web page and copy and paste the contents (including the headers)
              into the field below. Then click the Parse button above and if everything goes well, you are ready to
              start generating interesting track combinations!
            </TracklistInstructions>
            <br />
          </>
        ) : (
          <>
            <h4>
              First track
              <div className={classes.buttonRow}>
                <Button
                  disabled={processing}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => setEditingIntro(!editingIntro)}
                >
                  {editingIntro ? 'Done' : 'Edit'}
                </Button>
              </div>
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
              <div className={classes.buttonRow}>
                <Button
                  disabled={processing}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => setEditingOutro(!editingOutro)}
                >
                  {editingOutro ? 'Done' : 'Edit'}
                </Button>
                <Button
                  disabled={processing || outro === undefined}
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={() => setOutro(undefined)}
                >
                  Clear
                </Button>
              </div>
            </h4>
            {outro === undefined && !editingOutro ? (
              'Last track not selected'
            ) : (
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
            )}
            <h4>All tracks ({tracks.length} total)</h4>
            <Tracklist tracks={tracks} key="middle" />
          </>
        )}
        <div style={{ display: editingPlaylist ? 'block' : 'none' }}>
          <TextField
            fullWidth={true}
            rowsMax={20}
            multiline
            variant="outlined"
            onChange={(e) => {
              setTracklist(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault()
                const textArea = e.target
                const start = textArea.selectionStart
                const end = textArea.selectionEnd

                textArea.value = textArea.value.substring(0, start) + '\t' + textArea.value.substring(end)

                // put caret at right position again
                textArea.selectionStart = textArea.selectionEnd = start + 1

                setTracklist(textArea.value)
              }
            }}
            value={tracklist}
          />
        </div>
        <h3>Target length (tracks incl. first and last)</h3>
        <Slider
          min={outro === undefined ? 2 : 3}
          max={30}
          valueLabelDisplay="on"
          value={targetLength}
          disabled={processing}
          style={{ marginTop: 20 }}
          onChange={(_, value) => {
            setTargetLength(value)
            setParametersChanged(true)
            setCachedTargetValues(getTargetValues(parameterRange, targetLength, targetFn.fn))
          }}
        />
        <h3>Target curve</h3>
        <Select
          value={targetFn.name}
          disabled={processing}
          onChange={(e) => {
            const tf = targetFunctions.find(R.propEq('name', e.target.value))
            setTargetFunction(tf)
            setParametersChanged(true)
            setCachedTargetValues(getTargetValues(parameterRange, targetLength, tf.fn))
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
              data: getTargetValues(
                targetFn.name === 'Manual' ? limits(R.pluck('value', targetValues)) : parameterRange,
                targetLength,
                targetFn.fn
              ),
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
            <h4>Maximum tempo difference (%)</h4>
            <Slider
              min={0.0}
              max={20.0}
              step={0.1}
              valueLabelDisplay="on"
              value={maxTempoDifference}
              disabled={processing}
              onChange={(_, value) => {
                setMaxTempoDifference(Number(value))
                setParametersChanged(true)
              }}
            />
            {tracks.length < minimumTrackCountForPenalties ? null : (
              <>
                <h4>Tolerance (use bigger value if smaller do not give results)</h4>
                <Slider
                  min={0.0}
                  max={5.0}
                  step={0.1}
                  valueLabelDisplay="on"
                  value={tolerance}
                  disabled={processing}
                  onChange={(_, value) => {
                    setTolerance(Number(value))
                    setParametersChanged(true)
                  }}
                />
              </>
            )}

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
        <p>
          <Button
            color="primary"
            variant="contained"
            disabled={!intro || (!parametersChanged && paths.length !== 0) || processing || editingPlaylist}
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
                maxTempoDifference,
                filterByPenalty: tracks.length > minimumTrackCountForPenalties,
                timeout,
                seed,
                penalties: { [firstPropertyName(tracks[0])]: { weight: 1, fn: targetFn.fn } },
              })

              setCachedTargetValues(getTargetValues(parameterRange, targetLength, targetFn.fn))
              setParametersChanged(false)
              setPaths(paths)

              if (paths.length > 0) {
                setSelectedPath(paths[0])
              }

              setProcessing(false)
              setEditingSelectedTracklistResult(false)

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
          <h2 id="result">Result</h2>
          {!processing ? (
            <>
              <ButtonGroup color="primary" variant="contained">
                {paths.map((path, i) => (
                  <Button
                    key={i}
                    color={path === selectedPath ? 'secondary' : 'primary'}
                    onClick={() => {
                      setSelectedPath(path)
                      setSelectedTracklist(pathToTSV(path.path))
                    }}
                  >
                    {i + 1}
                  </Button>
                ))}
              </ButtonGroup>
              <h3>
                Tracklist
                <div className={classes.buttonRow}>
                  <Button
                    disabled={processing}
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      if (!editingSelectedTracklistResult) {
                        if (selectedPath.path.length !== 0) {
                          setSelectedTracklist(pathToTSV(selectedPath.path))
                        }
                      }
                      setEditingSelectedTracklistResult(!editingSelectedTracklistResult)
                    }}
                  >
                    {editingSelectedTracklistResult ? 'Parse' : 'Edit'}
                  </Button>
                </div>
              </h3>
              {!editingSelectedTracklistResult ? (
                <Tracklist tracks={selectedPath.path} />
              ) : (
                <>
                  <TracklistInstructions>
                    After exporting the playlist, open the web page and copy and paste the contents (including the
                    headers) into the field below. Then click the Done button above and if everything goes well, the
                    graphs should update!
                  </TracklistInstructions>
                  <br />
                  <TextField
                    fullWidth={true}
                    rowsMax={20}
                    multiline
                    display={editingSelectedTracklistResult ? 'block' : 'none'}
                    variant="outlined"
                    onChange={(e) => {
                      const textArea = e.target
                      setSelectedTracklist(textArea.value)
                      selectedPath.path = parsePlaylist(textArea.value)
                      selectedPath.penalty = undefined
                      setSelectedPath(selectedPath)
                      const newLength = selectedPath.path.length
                      if (newLength > targetLength) {
                        setTargetLength(newLength)
                        setCachedTargetValues(getTargetValues(parameterRange, newLength, targetFn.fn))
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault()
                        const textArea = e.target
                        const start = textArea.selectionStart
                        const end = textArea.selectionEnd

                        textArea.value = textArea.value.substring(0, start) + '\t' + textArea.value.substring(end)
                        textArea.selectionStart = textArea.selectionEnd = start + 1
                        setSelectedTracklist(textArea.value)

                        selectedPath.path = parsePlaylist(textArea.value)
                        selectedPath.penalty = undefined
                        setSelectedPath(selectedPath)
                        const newLength = selectedPath.path.length
                        if (newLength > targetLength) {
                          setTargetLength(newLength)
                          setCachedTargetValues(getTargetValues(parameterRange, newLength, targetFn.fn))
                        }
                      }
                    }}
                    value={selectedTracklist}
                  />
                </>
              )}
              <>
                {!selectedPath || !selectedPath.penalty ? null : (
                  <h3>Correlation with target curve ({Math.round(selectedPath.penalty * 100) / 100})</h3>
                )}
                <Chart
                  options={{
                    chart: {
                      id: 'apexchart-example',
                    },
                    xaxis: {
                      categories: selectedPath.path.map((pathItem) => truncateTitle(pathItem.title)),
                      name: 'Track',
                    },
                    yaxis: {
                      labels: {
                        formatter: function (val) {
                          return Math.floor(val)
                        },
                      },
                    },
                  }}
                  series={[
                    {
                      name: 'Target',
                      data: cachedTargetValues,
                    },
                    {
                      name: 'Actual',
                      data: selectedPath.path.map(firstPropertyValue),
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
                      categories: selectedPath.path.map((pathItem) => truncateTitle(pathItem.title)),
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
            </>
          ) : null}
        </div>
      </Container>
      <GithubCorner href="https://github.com/gadgetmies/mixtape_planner" target="_blank" />
    </>
  )
}

export default Planner
