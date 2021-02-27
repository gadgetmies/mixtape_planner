import GithubCorner from 'react-github-corner'
import React, { useState } from 'react'
import { useUrlSearchParams } from 'use-url-search-params'
import TextField from '@material-ui/core/TextField'
import parsePlaylist from './lib/parseTracklist'
import Chart from 'react-apexcharts'
import * as R from 'ramda'
import TracklistInstructions from './TracklistInstructions'
import Container from '@material-ui/core/Container'
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from '@kashuab/react-share'
import tinyurl from 'tinyurl'

const truncate = (length) => (input) => (input.length > length ? `${input.substring(0, length)}...` : input)
const truncateTitle = truncate(10)
const firstProperty = (track) => R.path([0], Object.entries(track.properties))
const firstPropertyValue = (track) => R.path([1], firstProperty(track))

const Visualizer = () => {
  const [params, setParams] = useUrlSearchParams({ tracklist: '' })
  if (params.tracklist.indexOf('Artist') === -1) {
    setParams({ tracklist: 'Artist\tTitle\tTempo\tKey\tComment\n' + params.tracklist })
  }
  const [parsedTracklist, setParsedTracklist] = useState(parsePlaylist(params.tracklist))

  const shortenUrl = () => tinyurl.shorten(window.location)

  return (
    <>
      <Container maxWidth="md">
        <h1>Mixtape Visualizer</h1>
        <TracklistInstructions>
          After exporting the playlist, open the web page and copy and paste the contents (including the headers) into
          the field below. Then click the Done button above and if everything goes well, the graphs should update!
        </TracklistInstructions>
        <br />
        <TextField
          fullWidth={true}
          rowsMax={20}
          multiline
          variant="outlined"
          onChange={(e) => {
            const textArea = e.target
            setParams({ tracklist: textArea.value })
            setParsedTracklist(parsePlaylist(textArea.value))
          }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault()
              const textArea = e.target
              const start = textArea.selectionStart
              const end = textArea.selectionEnd

              textArea.value = textArea.value.substring(0, start) + '\t' + textArea.value.substring(end)
              textArea.selectionStart = textArea.selectionEnd = start + 1
              setParams({ tracklist: textArea.value })
              setParsedTracklist(parsePlaylist(textArea.value))
            }
          }}
          value={params.tracklist}
        />
        <TwitterShareButton url={shortenUrl} title="This is how my mixtape looks">
          <TwitterIcon round={true} style={{ padding: '5px' }} />
        </TwitterShareButton>

        <FacebookShareButton url={shortenUrl} title="This is how my mixtape looks">
          <FacebookIcon round={true} style={{ padding: '5px' }} />
        </FacebookShareButton>

        <Chart
          options={{
            chart: {
              id: 'apexchart-example',
            },
            xaxis: {
              categories: parsedTracklist.map(({ title }) => truncateTitle(title)),
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
              name: 'Actual',
              data: parsedTracklist.map(firstPropertyValue),
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
              categories: parsedTracklist.map(({ title }) => truncateTitle(title)),
            },
          }}
          series={[
            {
              name: 'key',
              data: parsedTracklist.map(R.prop('keyNumber')),
            },
          ]}
          height="200"
        />
      </Container>
      <GithubCorner href="https://github.com/gadgetmies/mixtape_planner" target="_blank" />
    </>
  )
}
export default Visualizer
