import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import InfoIcon from '@material-ui/icons/Info'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import React from 'react'

export default (props) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<InfoIcon color={'primary'} />}
      aria-label="Expand"
      aria-controls="additional-actions1-content"
      id="additional-actions1-header"
    >
      Instructions
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        The planner is rather picky about the input it gets currently (a TSV formatted text with Artist, Title, Key and
        Comment columns). In order to produce such a file do the following:
        <br />
        <br />
        Export a playlist from Traktor as a web page. Include the Artist, Title, Key (or Key Text) and Comment columns.
        The planner uses the Comment column as input for the mood (target curve). The column can contain other data as
        well, but it needs to end with a number. If you are using <a href="https://mixedinkey.com">Mixed in Key</a>, you
        can configure it to write the energy level to the comment tag (Settings > Update Tags > Where to write it >
        Overwrite comments). If you do not have Mixed in Key, you can use a service like{' '}
        <a href="https://tunebat.com">Tunebat</a> to get the key and mood info.
        <br />
        <br />
        {props.children}
      </Typography>
    </AccordionDetails>
  </Accordion>
)
