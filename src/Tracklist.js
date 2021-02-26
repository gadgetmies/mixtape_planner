import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { getKeyString } from './lib/keys'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Radio from '@material-ui/core/Radio'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 400,
  },
})

export default function Tracklist({ tracks, editing, selectedTrackIndex, onTrackSelected }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {editing ? <TableCell>Select</TableCell> : null}
              <TableCell>Artist</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Tempo</TableCell>
              <TableCell>Key</TableCell>
              {tracks[0]
                ? Object.keys(tracks[0].properties).map((propertyName, i) => (
                    <TableCell key={i}>{propertyName.replace(/^./, propertyName[0].toUpperCase())}</TableCell>
                  ))
                : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track, i) => (
              <TableRow key={i}>
                {editing ? (
                  <TableCell key="select">
                    <Radio checked={selectedTrackIndex === i} onChange={() => onTrackSelected(i)} />
                  </TableCell>
                ) : null}
                <TableCell>{track.artist}</TableCell>
                <TableCell>{track.title}</TableCell>
                <TableCell>{parseInt(track.tempo)}</TableCell>
                <TableCell>{getKeyString(track.keyNumber, track.isMinor)}</TableCell>
                {Object.values(track.properties).map((property) => (
                  <TableCell key="property">{property}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
