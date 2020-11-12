import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { getKeyString } from './lib/keys'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

export default function Tracklist({ tracks }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader className="tracks">
          <TableHead>
            <TableRow>
              <TableCell>Intro?</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Key</TableCell>
              {tracks[0]
                ? Object.keys(tracks[0].properties).map((propertyName) => (
                    <TableCell>{propertyName.replace(/^./, propertyName[0].toUpperCase())}</TableCell>
                  ))
                : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track, i) => (
              <TableRow>
                <TableCell>
                  <input type="checkbox" data-intro-track-id={i} />
                </TableCell>
                <TableCell>{track.artist}</TableCell>
                <TableCell>{track.title}</TableCell>
                <TableCell>{getKeyString(track.keyNumber, track.isMinor)}</TableCell>
                {Object.values(track.properties).map((property) => (
                  <TableCell>{property}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
