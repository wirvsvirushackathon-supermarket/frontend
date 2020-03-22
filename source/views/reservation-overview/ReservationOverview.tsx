import React, { FunctionComponent } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AlarmIcon from '@material-ui/icons/Alarm'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import { format } from 'date-fns'
import { reservations } from './mockApi'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 'calc(100% - 30px)',
      'margin-left': 'auto',
      'margin-right': 'auto'
    }
  })
)

export const ReservationOverview: FunctionComponent = () => {
  const css = useStyles()
  const [expanded, setExpanded] = React.useState<number | false>(false)

  const handleChange = (panel: number) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={css.root}>
      <Typography variant="h4">
        {format(new Date(), 'EEEEEE dd.MM.yyyy')}
      </Typography>
      {reservations.map((ele, i) => {
        let amountReservations = 0
        ele.reservations.forEach(reservation => {
          amountReservations += reservation.persons
        })
        return (
          <ExpansionPanel
            key={ele.time}
            expanded={expanded === i}
            onChange={handleChange(i)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <Typography>
                    <AlarmIcon />
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography>{ele.time}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <PeopleAltIcon />
                </Grid>
                <Grid item xs={4}>
                  <Typography>&nbsp;{amountReservations}/20</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={3}>
                {ele.reservations.map(name => {
                  return (
                    <React.Fragment key={name.name}>
                      <Grid item xs={2}>
                        <Typography>
                          <PeopleAltIcon />
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>{name.number}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>{name.name}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>{name.persons} Personen</Typography>
                      </Grid>
                    </React.Fragment>
                  )
                })}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </div>
  )
}
